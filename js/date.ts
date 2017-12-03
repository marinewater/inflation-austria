import { inflation_data, update_inflation } from './inflation';
import { remove_children } from './removeChildren';

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
    on_year_change( year_to_select );
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
 */
function on_year_change( target: HTMLSelectElement ) {

    const selected_year = parseInt( target.value, 10 );

    const month_select = <HTMLSelectElement>target.parentElement.querySelector( 'select.month' );
    remove_children( month_select );

    for ( let month in inflation_data[ selected_year ] ) {

        const option_element = document.createElement( 'option' );
        option_element.text = month;

        month_select.appendChild( option_element );

    }

    update_inflation();

}

/**
 * event listener for month change events
 */
export function month_change_listener() {

    update_inflation();

}

