import { round } from "./conversion";

/**
 * gets euro value from input and converts it to a number
 * @returns {number}
 */
export function euro_from_getter(): number {

    let euro = parseFloat( (<HTMLInputElement>document.getElementById( 'euro_past' ) ).value );
    if ( isNaN( euro ) ) {
        euro = 0;
    }

    return euro;

}

/**
 * get schilling value from input and converts it to a number
 * @returns {number}
 */
export function schilling_from_getter(): number {

    let schilling = parseFloat( (<HTMLInputElement>document.getElementById( 'schilling_past' ) ).value );
    if ( isNaN( schilling ) ) {
        schilling = 0;
    }

    return schilling;

}

/**
 * writes value to euro_past input
 * @param {number} euro
 */
export function euro_from_setter( euro: number ) {

    (<HTMLInputElement>document.getElementById( 'euro_past' )).value = euro.toFixed( 2 );

}

/**
 * writes value to schilling_past input
 * @param {number} schilling
 */
export function schilling_from_setter( schilling: number ) {

    (<HTMLInputElement>document.getElementById( 'schilling_past' )).value = schilling.toFixed( 2 );

}

/**
 * gets year from year_from select
 * @returns {number}
 */
export function year_from_getter(): number {

    return parseInt( (<HTMLSelectElement>document.getElementById( 'year_from' )).value, 10 );

}

/**
 * gets month from month_from select
 * @returns {string}
 */
export function month_from_getter(): string {

    return (<HTMLSelectElement>document.getElementById( 'month_from' )).value;

}

/**
 * gets year from year_to select
 * @returns {number}
 */
export function year_to_getter(): number {

    return parseInt( (<HTMLSelectElement>document.getElementById( 'year_to' )).value, 10 );

}

/**
 * gets month from month_to select
 * @returns {string}
 */
export function month_to_getter(): string {

    return (<HTMLSelectElement>document.getElementById( 'month_to' )).value;

}

/**
 * writes resulting euro to euro result element
 * @param {number} euro
 */
export function euro_result_setter( euro: number ) {

    const euro_result_element = <HTMLParagraphElement>document.getElementById( 'euro_present' );
    euro_result_element.textContent = `${euro.toFixed( 2 )}€`;

}

/**
 * writes inflation to inflation result element
 * @param {number} inflation
 */
export function inflation_result_setter( inflation: number ) {

    const inflation_result_element = <HTMLParagraphElement>document.getElementById( 'inflation_present' );
    inflation_result_element.textContent = `(${inflation.toFixed( 2 )}% Inflation)`;

}

/**
 * gets the language from the html documents lang attribute
 * @returns {string}
 */
export function language_getter(): string {

    return (<HTMLHtmlElement>document.querySelector( 'html')).getAttribute( 'lang' );

}