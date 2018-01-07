import { schilling_exchange_rate } from './constants';
import { euro_from_getter, euro_from_setter, schilling_from_getter, schilling_from_setter } from './html';
import { update_inflation } from './inflation';
/**
 * event listener for euro change events
 * updates Schilling with conversion rate
 * @param {Event} e
 */
export function euro_past_listener(e) {
    var euro = euro_from_getter();
    schilling_from_setter(round(euro * schilling_exchange_rate));
    update_inflation();
}
/**
 * event listener for Schilling change events
 * updates euro with conversion rate
 * @param {Event} e
 */
export function schilling_past_listener(e) {
    var schilling = schilling_from_getter();
    euro_from_setter(round(schilling / schilling_exchange_rate));
    update_inflation();
}
/**
 * rounds to two decimal places
 * @param {number} input number to be rounded
 * @returns {number} rounded number
 */
export function round(input) {
    return Math.round(input * 100) / 100;
}
