#!/usr/bin/env node

'use strict';

const child_process = require( 'child_process' );
const fs = require( 'fs' );
const path = require( 'path' );
const rollup = require( 'rollup' );
const UglifyJS = require( 'uglify-js' );
const util = require( 'util' );

const copyFileAsync = util.promisify( fs.copyFile );
const mkdirAsync = util.promisify( fs.mkdir );
const readDirAsync = util.promisify( fs.readdir );
const writeFileAsync = util.promisify( fs.writeFile );


const interfaces_dir = path.join( path.join( __dirname, '../interfaces/' ) );
const browser_js_dir = path.join( __dirname, '../js/' );
const browser_test_js_dir = path.join( __dirname, '../test/js/' );
const browser_test_sources_dir = path.join( __dirname, '../test/sources/' );
const browser_test_sources_js_dir = path.join( __dirname, '../test/sources/js/' );
const browser_test_sources_interfaces_dir = path.join( __dirname, '../test/sources/interfaces/' );
const project_dir = path.join( __dirname, '../' );

/**
 * run typescript compiler in the provided directory
 * @param cwd current working directory
 * @param {string|null} [path_to_tsconfig]
 * @returns {Promise<{code: *, map: *}>}
 */
function compile_ts( cwd, path_to_tsconfig = null ) {

    return new Promise( function( resolve, reject ) {

        const options = [];

        if ( path_to_tsconfig !== null ) {
            options.push( '-p' );
            options.push( path_to_tsconfig );
        }

        const tsc = child_process.spawn( path.join( __dirname, '../node_modules/typescript/bin/tsc' ), options, {
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
 * copies and compiles files for tests
 * @returns {Promise<void>}
 */
async function build_test_files() {

    try {
        await mkdirAsync( browser_test_sources_dir );
    }
    catch( error ) {
        if ( error.code !== 'EEXIST' ) {
            throw error;
        }
    }

    await Promise.all([
        compile_ts( browser_js_dir, path.join( browser_js_dir, './tsconfig.test.json' ) ),
        list_ts_files( browser_js_dir )
            .then( ( files ) => copy_files( files, browser_js_dir, browser_test_sources_js_dir ) ),
        list_ts_files( interfaces_dir )
            .then( ( files ) => copy_files( files, interfaces_dir, browser_test_sources_interfaces_dir ) )
    ]);

}

/**
 * returns all files that end in *.ts
 * @param {string} directory
 * @returns {Promise<string[]>}
 */
async function list_ts_files( directory ) {

    const files = await readDirAsync( directory );

    return files
        .filter( ( file_name ) => file_name.toString().match( /\.ts$/i ) );

}

/**
 * copies a list of files to a target directory
 * @param {string[]} files
 * @param {string} source_directory
 * @param {string} target_directory
 * @returns {Promise<void>}
 */
async function copy_files( files, source_directory, target_directory ) {

    const queue = [];

    files.forEach( function( file ) {

        queue.push( copyFileAsync( path.join( source_directory, file ), path.join( target_directory, file ) ) );

    });

    return Promise.all( queue );

}

/**
 * save typescript compilation and minification
 * @param {boolean} [do_minify=true] set to false to skip minification
 * @returns {Promise<void>}
 */
async function main( do_minify = true ) {

    await build_test_files();
    await compile_ts( project_dir );
    await compile_ts( browser_test_js_dir );
    await compile_ts( browser_js_dir )
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