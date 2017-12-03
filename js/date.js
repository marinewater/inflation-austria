"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inflation_1 = require("./inflation");
const removeChildren_1 = require("./removeChildren");
/**
 * adds selectable year options to all year select elements
 */
function add_years() {
    const year_from_select = document.getElementById('year_from');
    const year_to_select = document.getElementById('year_to');
    add_years_to_select(year_from_select);
    add_years_to_select(year_to_select);
    year_from_select.firstChild.selected = true;
    year_to_select.lastChild.selected = true;
    on_year_change(year_from_select);
    on_year_change(year_to_select);
    inflation_1.update_inflation();
}
exports.add_years = add_years;
/**
 * adds selectable years to a specific select element
 * @param {HTMLSelectElement} select element where the options should be appended
 */
function add_years_to_select(select) {
    for (let year in inflation_1.inflation_data) {
        const option_element = document.createElement('option');
        option_element.text = year;
        select.appendChild(option_element);
    }
}
/**
 * event listener for year change events
 * @param {Event} e
 */
function year_change_listener(e) {
    const target = e.target;
    on_year_change(target);
}
exports.year_change_listener = year_change_listener;
/**
 * adds month to month select if year is changed and recalculates inflation
 * @param {HTMLSelectElement} target year select element
 */
function on_year_change(target) {
    const selected_year = parseInt(target.value, 10);
    const month_select = target.parentElement.querySelector('select.month');
    removeChildren_1.remove_children(month_select);
    for (let month in inflation_1.inflation_data[selected_year]) {
        const option_element = document.createElement('option');
        option_element.text = month;
        month_select.appendChild(option_element);
    }
    inflation_1.update_inflation();
}
/**
 * event listener for month change events
 */
function month_change_listener() {
    inflation_1.update_inflation();
}
exports.month_change_listener = month_change_listener;
