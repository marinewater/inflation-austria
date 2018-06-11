import { inflation_data, update_inflation } from './inflation';
import { remove_children } from './removeChildren';
import { translate_month } from './i18n';

/**
 * adds selectable year options to all year select elements
 */
export function add_years() {

    const year_from_select = <HTMLSelectElement>document.getElementById( 'year_from' );
    const year_to_select = <HTMLSelectElement>document.getElementById( 'year_to' );

    add_years_to_select( year_from_select );
    add_years_to_select( year_to_select );

    (<HTMLOptionElement>year_from_select.firstChild).selected = true;
    (<HTMLOptionElement>year_to_select.lastChild).selected = true;
    on_year_change( year_from_select );
    on_year_change( year_to_select, true );
    update_inflation();

}

/**
 * adds selectable years to a specific select element
 * @param {HTMLSelectElement} select element where the options should be appended
 */
function add_years_to_select( select: HTMLSelectElement ) {

    for ( let year in inflation_data ) {

        const option_element = document.createElement( 'option' );
        option_element.text = year;

        select.appendChild( option_element );

    }

}

/**
 * event listener for year change events
 * @param {Event} e
 */
export function year_change_listener( e: Event ) {

    const target = <HTMLSelectElement>e.target;
    on_year_change( target );

}

/**
 * adds month to month select if year is changed and recalculates inflation
 * @param {HTMLSelectElement} target year select element
 * @param {boolean} [select_last=false]
 */
function on_year_change( target: HTMLSelectElement, select_last = false ) {

    const selected_year = parseInt( target.value, 10 );

    const month_select = <HTMLSelectElement>target.parentElement.querySelector( 'select.month' );
    const selected_month_name = month_select.value;
    remove_children( month_select );

    for ( let month in inflation_data[ selected_year ] ) {

        const option_element = document.createElement( 'option' );
        option_element.text = translate_month( month );
        option_element.value = month;

        month_select.appendChild( option_element );

    }

    const new_month_index = _get_month_index( selected_month_name, month_select, select_last );
    const months = month_select.querySelectorAll( 'option' );
    (<HTMLOptionElement>months[ new_month_index ]).selected = true;

    update_inflation();

}

/**
 * returns index of the given month name in a list of option elements
 * returns 0 if month cannot be found
 * @param {string | null} month_name
 * @param {HTMLSelectElement} month_select
 * @param {boolean} select_last
 * @returns {number}
 * @private
 */
function _get_month_index( month_name: string|null, month_select: HTMLSelectElement, select_last: boolean ) {

    const months_options = <NodeListOf<HTMLOptionElement>>month_select.querySelectorAll( 'option' );
    if ( select_last === true ) {
        return months_options.length - 1;
    }

    if ( month_name === null ) {
        return 0;
    }

    for ( let i = 0; i < months_options.length; i++ ) {
        if ( months_options[ i ].value === month_name ) {
            return i;
        }
    }

    return 0;
}

/**
 * event listener for month change events
 */
export function month_change_listener() {

    update_inflation();

}