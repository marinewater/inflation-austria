"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var html_1 = require("./html");
var inflation_1 = require("./inflation");
/**
 * event listener for euro change events
 * updates Schilling with conversion rate
 * @param {Event} e
 */
function euro_past_listener(e) {
    var euro = html_1.euro_from_getter();
    html_1.schilling_from_setter(round(euro * constants_1.schilling_exchange_rate));
    inflation_1.update_inflation();
}
exports.euro_past_listener = euro_past_listener;
/**
 * event listener for Schilling change events
 * updates euro with conversion rate
 * @param {Event} e
 */
function schilling_past_listener(e) {
    var schilling = html_1.schilling_from_getter();
    html_1.euro_from_setter(round(schilling / constants_1.schilling_exchange_rate));
    inflation_1.update_inflation();
}
exports.schilling_past_listener = schilling_past_listener;
/**
 * rounds to two decimal places
 * @param {number} input number to be rounded
 * @returns {number} rounded number
 */
function round(input) {
    return Math.round(input * 100) / 100;
}
exports.round = round;
