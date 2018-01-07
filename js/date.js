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
    on_year_change(year_to_select);
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
 */
function on_year_change(target) {
    var selected_year = parseInt(target.value, 10);
    var month_select = target.parentElement.querySelector('select.month');
    remove_children(month_select);
    for (var month in inflation_data[selected_year]) {
        var option_element = document.createElement('option');
        option_element.text = month;
        month_select.appendChild(option_element);
    }
    update_inflation();
}
/**
 * event listener for month change events
 */
export function month_change_listener() {
    update_inflation();
}
