/**
 * rounds to two decimal places
 * @param {number} input number to be rounded
 * @returns {number} rounded number
 */
export function round(input: number): number {

    return Math.round(input * 100) / 100;

}