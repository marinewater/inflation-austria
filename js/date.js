import { inflation_data, update_inflation } from './inflation';
import { remove_children } from './removeChildren';
/**
 * adds selectable year options to all year select elements
 */
export function add_years() {
    var year_from_select = document.getElementById('year_from');
    var year_to_select = document.getElementById('year_to');
    add_years_to_select(year_from_select);
    add_years_to_select(year_to_select);
    year_from_select.firstChild.selected = true;
    year_to_select.lastChild.selected = true;
    on_year_change(year_from_select);
    on_year_change(year_to_select, true);
    update_inflation();
}
/**
 * adds selectable years to a specific select element
 * @param {HTMLSelectElement} select element where the options should be appended
 */
function add_years_to_select(select) {
    for (var year in inflation_data) {
        var option_element = document.createElement('option');
        option_element.text = year;
        select.appendChild(option_element);
    }
}
/**
 * event listener for year change events
 * @param {Event} e
 */
export function year_change_listener(e) {
    var target = e.target;
    on_year_change(target);
}
/**
 * adds month to month select if year is changed and recalculates inflation
 * @param {HTMLSelectElement} target year select element
 * @param {boolean} [select_last=false]
 */
function on_year_change(target, select_last) {
    if (select_last === void 0) { select_last = false; }
    var selected_year = parseInt(target.value, 10);
    var month_select = target.parentElement.querySelector('select.month');
    var selected_month_name = month_select.value;
    remove_children(month_select);
    for (var month in inflation_data[selected_year]) {
        var option_element = document.createElement('option');
        option_element.text = month;
        month_select.appendChild(option_element);
    }
    var new_month_index = _get_month_index(selected_month_name, month_select, select_last);
    var months = month_select.querySelectorAll('option');
    months[new_month_index].selected = true;
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
function _get_month_index(month_name, month_select, select_last) {
    var months_options = month_select.querySelectorAll('option');
    if (select_last === true) {
        return months_options.length - 1;
    }
    if (month_name === null) {
        return 0;
    }
    for (var i = 0; i < months_options.length; i++) {
        if (months_options[i].value === month_name) {
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
