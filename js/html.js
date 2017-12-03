"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * gets euro value from input and converts it to a number
 * @returns {number}
 */
function euro_from_getter() {
    let euro = parseFloat(document.getElementById('euro_past').value);
    if (isNaN(euro)) {
        euro = 0;
    }
    return euro;
}
exports.euro_from_getter = euro_from_getter;
/**
 * get schilling value from input and converts it to a number
 * @returns {number}
 */
function schilling_from_getter() {
    let schilling = parseFloat(document.getElementById('schilling_past').value);
    if (isNaN(schilling)) {
        schilling = 0;
    }
    return schilling;
}
exports.schilling_from_getter = schilling_from_getter;
/**
 * writes value to euro_past input
 * @param {number} euro
 */
function euro_from_setter(euro) {
    document.getElementById('euro_past').value = euro.toFixed(2);
}
exports.euro_from_setter = euro_from_setter;
/**
 * writes value to schilling_past input
 * @param {number} schilling
 */
function schilling_from_setter(schilling) {
    document.getElementById('schilling_past').value = schilling.toFixed(2);
}
exports.schilling_from_setter = schilling_from_setter;
/**
 * gets year from year_from select
 * @returns {number}
 */
function year_from_getter() {
    return parseInt(document.getElementById('year_from').value, 10);
}
exports.year_from_getter = year_from_getter;
/**
 * gets month from month_from select
 * @returns {string}
 */
function month_from_getter() {
    return document.getElementById('month_from').value;
}
exports.month_from_getter = month_from_getter;
/**
 * gets year from year_to select
 * @returns {number}
 */
function year_to_getter() {
    return parseInt(document.getElementById('year_to').value, 10);
}
exports.year_to_getter = year_to_getter;
/**
 * gets month from month_to select
 * @returns {string}
 */
function month_to_getter() {
    return document.getElementById('month_to').value;
}
exports.month_to_getter = month_to_getter;
/**
 * writes resulting euro to euro result element
 * @param {number} euro
 */
function euro_result_setter(euro) {
    const euro_result_element = document.getElementById('euro_present');
    euro_result_element.textContent = `${euro.toFixed(2)}€`;
}
exports.euro_result_setter = euro_result_setter;
/**
 * writes inflation to inflation result element
 * @param {number} inflation
 */
function inflation_result_setter(inflation) {
    const inflation_result_element = document.getElementById('inflation_present');
    inflation_result_element.textContent = `(${inflation.toFixed(2)}% Inflation)`;
}
exports.inflation_result_setter = inflation_result_setter;
