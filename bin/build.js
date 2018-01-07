#!/usr/bin/env node

'use strict';

const child_process = require( 'child_process' );
const fs = require( 'fs' );
const path = require( 'path' );
const rollup = require( 'rollup' );
const UglifyJS = require( 'uglify-js' );
const util = require( 'util' );

const writeFileAsync = util.promisify( fs.writeFile );

/**
 * run typescript compiler in the provided directory
 * @param cwd current working directory
 * @returns {Promise<{code: *, map: *}>}
 */
function compile_ts( cwd ) {

    return new Promise( function( resolve, reject ) {

        const tsc = child_process.spawn( path.join( __dirname, '../node_modules/typescript/bin/tsc' ), [], {
            cwd
        });

        tsc.on( 'close', function( code ) {

            if ( code !== 0 ) {
                reject( `Typescript exited with code ${code}` );
            }
            else {
                resolve();
            }

        });

    });

}

/**
 * use rollup to bundle javascript files and remove dead code
 * @returns {Promise<{code: *, map: *}>}
 */
async function bundle() {

    const bundle = await rollup.rollup({
        input: path.join( __dirname, '../js/index.js' )
    });

    const { code, map } = await bundle.generate({
        format: 'iife',
        sourcemap: true,
        sourcemapFile: path.join( __dirname, '../assets/bundle.js' )
    });

    return {
        code,
        map
    };

}

/**
 * use uglifyJs to mangle and compress code
 * @param code
 * @param map
 * @returns {Promise<{code: string, map: string}>}
 */
async function minify( { code, map } ) {

    const result = UglifyJS.minify( code, {
        sourceMap: {
            content: map.toString(),
            url: 'bundle.js.map'
        }
    });


    if ( result.error ) {
        throw result.error;
    }

    return {
        code: result.code,
        map: result.map
    };

}

/**
 * write source map and bundles javascript to disk
 * @param {string} code
 * @param {string} map
 * @returns {Promise<void>}
 */
async function write( { code, map } ) {


    await Promise.all([
        writeFileAsync( path.join( __dirname, '../assets/bundle.js' ), code ),
        writeFileAsync( path.join( __dirname, '../assets/bundle.js.map' ), map )
    ]);

}

/**
 * start typescript compilation and minification
 * @param {boolean} [do_minify=true] set to false to skip minification
 * @returns {Promise<void>}
 */
async function main( do_minify = true ) {

    await compile_ts( path.join( __dirname, '../' ) );
    await compile_ts( path.join( __dirname, '../test/js/' ) );
    await compile_ts( path.join( __dirname, '../js/' ) )
            .then( bundle )
            .then( function( result ) {

                if ( do_minify ) {
                    return minify( result );
                }
                else {
                    return result;
                }

            })
            .then( write );

}

main( true )
    .then( () => process.exit( 0 ) )
    .catch( err => console.log( err ) );