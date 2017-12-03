import { round } from './conversion';
import { add_years } from './date';
import { year_from_getter, month_from_getter, year_to_getter, month_to_getter, euro_from_getter,
    euro_result_setter, inflation_result_setter } from './html';
import { InflationData } from '../interfaces/inflation';
import { request } from './request';

export let inflation_data: InflationData = {};

/**
 * Downloads and stores inflation data.
 */
export function get_data() {

    request( './data/inflation_data.json', function ( err, result ) {

        if ( err ) {
            throw err;
        }

        inflation_data = JSON.parse( result );
        add_years()

    });

}

/**
 * Calculates inflation between two dates.
 * @param {number} from_year calculate inflation starting from this year
 * @param {string} from_month calculate inflation starting from this month
 * @param {number} to_year calculate inflation level in this year
 * @param {string} to_month calculate inflation level in this month
 * @returns {number} inflation
 */
function calculate_inflation( from_year: number, from_month: string, to_year: number, to_month: string ): number {

    const from_inflation = inflation_data[ from_year ][ from_month ];
    const to_inflation = inflation_data[ to_year ][ to_month ];

    return to_inflation / from_inflation;

}

/**
 * Reads inflation data from input fields and displays resulting inflation
 */
export function update_inflation() {

    const year_from = year_from_getter();
    const month_from = month_from_getter();
    const year_to = year_to_getter();
    const month_to = month_to_getter();

    const inflation = calculate_inflation( year_from, month_from, year_to, month_to );
    let from_euro = euro_from_getter();
    const to_euro = round(from_euro * inflation );

    euro_result_setter( to_euro );

    inflation_result_setter( round(( inflation - 1 ) * 100 ) );

}