import { Inflation } from './inflation';
import { round } from './round';
import { schilling_exchange_rate } from './constants';
import { remove_children } from './removeChildren';
import { monthOrder } from './month_order';
import { translate_month } from './i18n';


export class Listeners {
    private readonly _inflation: Inflation;

    constructor(inflation: Inflation) {
        this._inflation = inflation;
    }

    /**
     * Binds event listeners to html elements on page load
     */
    public addListeners() {
        document.getElementById( 'euro_past' ).addEventListener('change', e => this._euroPast(e));
        document.getElementById( 'euro_past' ).addEventListener('keyup', e => this._euroPast(e));

        document.getElementById( 'schilling_past' ).addEventListener('change', e => this._schillingPast(e));
        document.getElementById( 'schilling_past' ).addEventListener('keyup', e => this._schillingPast(e));

        document.getElementById( 'year_from' ).addEventListener('change', e => this._yearChangeListener(e));
        document.getElementById( 'month_from' ).addEventListener('change', e => this._monthChangeListener());

        document.getElementById( 'year_to' ).addEventListener('change', e => this._yearChangeListener(e));
        document.getElementById( 'month_to' ).addEventListener('change', e => this._monthChangeListener());
    }

    private _updateInflation() {
        const year_from = Listeners._yearFromGetter();
        const month_from = Listeners._monthFromGetter();
        const year_to = Listeners._yearToGetter();
        const month_to = Listeners._monthToGetter();

        const inflation = this._inflation.Calculate(year_from, month_from, year_to, month_to);
        let from_euro = Listeners._euroFromGetter();
        const to_euro = round(from_euro * inflation );

        Listeners._euroResultSetter( to_euro );

        Listeners._inflationResultSetter( round(( inflation - 1 ) * 100 ) );
    }

    /**
     * event listener for euro change events
     * updates Schilling with conversion rate
     * @param {Event} e
     */
    private _euroPast(e: Event) {
        const euro = Listeners._euroFromGetter();
        Listeners._schillingFromSetter(round(euro * schilling_exchange_rate));
        this._updateInflation();
    }

    /**
     * event listener for Schilling change events
     * updates euro with conversion rate
     * @param {Event} e
     */
    private _schillingPast(e: Event) {
        const schilling = Listeners._schillingFromGetter();
        Listeners._euroFromSetter(round(schilling / schilling_exchange_rate));
        this._updateInflation();
    }

    /**
     * adds month to month select if year is changed and recalculates inflation
     * @param {HTMLSelectElement} target year select element
     * @param {boolean} [select_last=false]
     */
    private _onYearChange(target: HTMLSelectElement, select_last = false) {
        const selected_year = parseInt(target.value, 10);

        const month_select = <HTMLSelectElement>target.parentElement.querySelector('select.month');
        const selected_month_name = month_select.value;
        remove_children(month_select);

        const sortedMonth = Object.keys(this._inflation.inflationData[ selected_year ])
            .sort((a, b) => monthOrder[a]-monthOrder[b]);
        for (let month of sortedMonth) {

            const option_element = document.createElement('option');
            option_element.text = translate_month(Listeners._languageGetter(), month);
            option_element.value = month;

            month_select.appendChild(option_element);
        }

        const new_month_index = Listeners._getMonthIndex(selected_month_name, month_select, select_last);
        const months = month_select.querySelectorAll('option');
        (<HTMLOptionElement>months[ new_month_index ]).selected = true;

        this._updateInflation();
    }

    /**
     * event listener for year change events
     * @param {Event} e
     */
    private _yearChangeListener(e: Event) {
        const target = <HTMLSelectElement>e.target;
        this._onYearChange(target);
    }

    /**
     * event listener for month change events
     */
    private _monthChangeListener() {
        this._updateInflation();
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
    private static _getMonthIndex(month_name: string|null, month_select: HTMLSelectElement, select_last: boolean) {
        const months_options = <NodeListOf<HTMLOptionElement>>month_select.querySelectorAll('option');
        if (select_last === true) {
            return months_options.length - 1;
        }

        if (month_name === null) {
            return 0;
        }

        for (let i = 0; i < months_options.length; i++) {
            if (months_options[ i ].value === month_name) {
                return i;
            }
        }

        return 0;
    }

    /**
     * adds selectable year options to all year select elements
     */
    public addYears() {
        const year_from_select = <HTMLSelectElement>document.getElementById('year_from');
        const year_to_select = <HTMLSelectElement>document.getElementById('year_to');

        this._addYearsToSelect(year_from_select);
        this._addYearsToSelect(year_to_select);

        (<HTMLOptionElement>year_from_select.firstChild).selected = true;
        (<HTMLOptionElement>year_to_select.lastChild).selected = true;
        this._onYearChange(year_from_select);
        this._onYearChange(year_to_select, true);
        this._updateInflation();
    }


    /**
     * adds selectable years to a specific select element
     * @param {HTMLSelectElement} select element where the options should be appended
     */
    private _addYearsToSelect( select: HTMLSelectElement ) {
        const sortedYears = Object.keys(this._inflation.inflationData).map(y => parseInt(y, 10)).sort((a, b) => a-b);
        for ( let year of sortedYears ) {
            const option_element = document.createElement( 'option' );
            option_element.text = year.toString(10);

            select.appendChild( option_element );
        }
    }

    /**
     * gets euro value from input and converts it to a number
     * @returns {number}
     */
    private static _euroFromGetter(): number {
        let euro = parseFloat((<HTMLInputElement>document.getElementById('euro_past')).value);
        if (isNaN(euro)) {
            euro = 0;
        }

        return euro;
    }

    /**
     * get schilling value from input and converts it to a number
     * @returns {number}
     */
    private static _schillingFromGetter(): number {
        let schilling = parseFloat((<HTMLInputElement>document.getElementById( 'schilling_past')).value );
        if (isNaN(schilling)) {
            schilling = 0;
        }

        return schilling;
    }

    /**
     * writes value to euro_past input
     * @param {number} euro
     */
    private static _euroFromSetter(euro: number) {
        (<HTMLInputElement>document.getElementById('euro_past')).value = euro.toFixed(2);
    }

    /**
     * writes value to schilling_past input
     * @param {number} schilling
     */
    private static _schillingFromSetter(schilling: number) {
        (<HTMLInputElement>document.getElementById('schilling_past')).value = schilling.toFixed(2);
    }

    /**
     * gets year from year_from select
     * @returns {number}
     */
    private static _yearFromGetter(): number {
        return parseInt((<HTMLSelectElement>document.getElementById('year_from')).value, 10);
    }

    /**
     * gets month from month_from select
     * @returns {string}
     */
    private static _monthFromGetter(): string {
        return (<HTMLSelectElement>document.getElementById('month_from')).value;
    }

    /**
     * gets year from year_to select
     * @returns {number}
     */
    private static _yearToGetter(): number {
        return parseInt((<HTMLSelectElement>document.getElementById('year_to')).value, 10);
    }

    /**
     * gets month from month_to select
     * @returns {string}
     */
    private static _monthToGetter(): string {
        return (<HTMLSelectElement>document.getElementById('month_to')).value;
    }

    /**
     * writes resulting euro to euro result element
     * @param {number} euro
     */
    private static _euroResultSetter(euro: number) {
        const euro_result_element = <HTMLParagraphElement>document.getElementById('euro_present');
        euro_result_element.textContent = `${euro.toFixed(2)}€`;
    }

    /**
     * writes inflation to inflation result element
     * @param {number} inflation
     */
    private static _inflationResultSetter(inflation: number) {
        const inflation_result_element = <HTMLParagraphElement>document.getElementById('inflation_present');
        inflation_result_element.textContent = `(${inflation.toFixed( 2 )}% Inflation)`;
    }

    /**
     * gets the language from the html documents lang attribute
     * @returns {string}
     */
    private static _languageGetter(): string {
        return (<HTMLHtmlElement>document.querySelector('html')).getAttribute('lang');
    }
}