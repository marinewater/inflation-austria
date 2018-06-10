import { promisify } from 'util';
import { writeFile } from 'fs';
import { InflationData as Data } from '../interfaces/inflation';
import * as cheerio from 'cheerio';
import * as path from 'path';
import * as request from 'request-promise';

const writeFileAsync = promisify( writeFile );

export class InflationData {

    private _html: string;
    private _inflation_data: Data;

    /**
     * download and parse inflation data, then write it to disk
     * @returns {Promise<void>}
     */
    async save() {

        await this.load();
        await this._saveData();

    }

    /**
     * download and return inflation data
     * @returns {Promise<InflationData>}
     */
    async load(): Promise<Data> {
        await this._download();
        this._extractData();
        return this._inflation_data;
    }

    /**
     * download inflation data
     * @returns {Promise<void>}
     * @private
     */
    private async _download() {

        const { body, statusCode } = await request.get( {
            uri: 'http://statistik.at/web_de/statistiken/wirtschaft/preise/verbraucherpreisindex_vpi_hvpi/zeitreihen_und_verkettungen/022815.html',
            resolveWithFullResponse: true
        });

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

        const years: { [ index: number ]: number } = {};

        $( '.datentabelle tbody tr' ).each( function ( index_tr, tr ) {

            if ( $( tr ).hasClass( 'hervorhebungGesamt' ) ) {

                $( tr ).find( 'td' ).each( function ( index_td, td ) {

                    years[ index_td ] = parseInt( $( td ).text(), 10 );

                } );

            } else {

                const month = $( tr ).find( 'th' ).text();

                $( tr ).find( 'td' ).each( function ( index_td, td ) {

                    if ( !data.hasOwnProperty( years[ index_td ] ) ) {
                        data[ years[ index_td ] ] = {};
                    }

                    const year = years[ index_td ];
                    const inflation = parseFloat( $( td ).text().replace( /,/, '.' ) );

                    if ( !isNaN( year ) && !isNaN( inflation ) ) {
                        data[ year ][ month ] = inflation;
                    }

                } );
            }

        } );

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