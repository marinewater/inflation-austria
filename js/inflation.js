"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conversion_1 = require("./conversion");
var date_1 = require("./date");
var html_1 = require("./html");
var request_1 = require("./request");
exports.inflation_data = {};
/**
 * Downloads and stores inflation data.
 */
function get_data() {
    request_1.request('./data/inflation_data.json', function (err, result) {
        if (err) {
            throw err;
        }
        exports.inflation_data = JSON.parse(result);
        date_1.add_years();
    });
}
exports.get_data = get_data;
/**
 * Calculates inflation between two dates.
 * @param {number} from_year calculate inflation starting from this year
 * @param {string} from_month calculate inflation starting from this month
 * @param {number} to_year calculate inflation level in this year
 * @param {string} to_month calculate inflation level in this month
 * @returns {number} inflation
 */
function calculate_inflation(from_year, from_month, to_year, to_month) {
    var from_inflation = exports.inflation_data[from_year][from_month];
    var to_inflation = exports.inflation_data[to_year][to_month];
    return to_inflation / from_inflation;
}
/**
 * Reads inflation data from input fields and displays resulting inflation
 */
function update_inflation() {
    var year_from = html_1.year_from_getter();
    var month_from = html_1.month_from_getter();
    var year_to = html_1.year_to_getter();
    var month_to = html_1.month_to_getter();
    var inflation = calculate_inflation(year_from, month_from, year_to, month_to);
    var from_euro = html_1.euro_from_getter();
    var to_euro = conversion_1.round(from_euro * inflation);
    html_1.euro_result_setter(to_euro);
    html_1.inflation_result_setter(conversion_1.round((inflation - 1) * 100));
}
exports.update_inflation = update_inflation;
