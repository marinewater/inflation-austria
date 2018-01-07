import * as cheerio from 'cheerio';
import { writeFile } from 'fs';
import * as path from 'path';
import * as request from 'request';
import { promisify } from 'util';
import { InflationData as Data } from '../interfaces/inflation';

const requestGetAsync: any = promisify( request.get );
const writeFileAsync = promisify( writeFile );



class InflationData {

    private _html: string;
    private _inflation_data: Data;

    /**
     * download and parse inflation data, then write it to disk
     * @returns {Promise<void>}
     */
    async start() {

        await this._download();
        this._extractData();
        await this._saveData();

    }

    /**
     * download inflation data
     * @returns {Promise<void>}
     * @private
     */
    private async _download() {

        const { body, statusCode } = await requestGetAsync( 'http://statistik.at/web_de/statistiken/wirtschaft/preise/verbraucherpreisindex_vpi_hvpi/zeitreihen_und_verkettungen/022815.html' );

        if ( statusCode !== 200 ) {
            throw new Error( `Unable to download inflation data, website returned http error ${statusCode}` );
        }

        this._html = body.toString();

    }

    /**
     * extract the necessary data and parse it
     * @private
     */
    private _extractData() {

        const $ = cheerio.load( this._html );
        const data: Data = {};

        data[ 1946 ] = {
            'März': 100
        };

        const years: {[index: number]: number} = {};

        $( '.datentabelle tbody tr' ).each( function ( index_tr, tr ) {

            if ( $( tr ).hasClass( 'hervorhebungGesamt' ) ) {

                $( tr ).find( 'td' ).each( function( index_td, td ) {

                    years[ index_td ] = parseInt( $( td ).text(), 10 );

                });

            } else {

                const month = $( tr ).find( 'th' ).text();

                $( tr ).find( 'td' ).each( function( index_td, td ) {

                    if ( !data.hasOwnProperty( years[ index_td ] ) ) {
                        data[ years[ index_td ] ] = {};
                    }

                    const year = years[ index_td ];
                    const inflation = parseFloat( $( td ).text().replace( /,/, '.' ) );

                    if ( !isNaN( year ) && !isNaN( inflation ) ) {
                        data[ year ][ month ] = inflation;
                    }

                });
            }

        });

        for ( let year in data ) {
            if ( Object.keys( data[ year ] ).length === 0 && data[ year ].constructor === Object ) {
                delete data[ year ];
            }
        }

        this._inflation_data = data;

    }

    /**
     * write inflation data to disk
     * @returns {Promise<void>}
     * @private
     */
    private async _saveData() {

        await writeFileAsync( path.join( __dirname, '../data/inflation_data.json' ), JSON.stringify( this._inflation_data ) );

    }

}

function main() {

    const i = new InflationData();
    i.start()
        .then( () => console.log( 'done' ) )
        .then( () => process.exit( 0 ) )
        .catch( error => console.log( error ) );

}

main();