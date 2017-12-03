import { euro_past_listener, schilling_past_listener } from './conversion';
import { year_change_listener, month_change_listener } from './date';

/**
 * Binds event listeners to html elements on page load
 */
export function addListeners() {

    document.getElementById( 'euro_past' ).addEventListener( 'change', euro_past_listener);
    document.getElementById( 'euro_past' ).addEventListener( 'keyup', euro_past_listener);

    document.getElementById( 'schilling_past' ).addEventListener( 'change', schilling_past_listener);
    document.getElementById( 'schilling_past' ).addEventListener( 'keyup', schilling_past_listener);
    
    document.getElementById( 'year_from' ).addEventListener( 'change', year_change_listener );
    document.getElementById( 'month_from' ).addEventListener( 'change', month_change_listener );

    document.getElementById( 'year_to' ).addEventListener( 'change', year_change_listener );
    document.getElementById( 'month_to' ).addEventListener( 'change', month_change_listener );

}