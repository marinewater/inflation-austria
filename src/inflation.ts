import { InflationData } from '../interfaces/inflation';

export class Inflation {
    public inflationData: InflationData;

    /**
     * Downloads and stores inflation data.
     */
    public async GetData() {
        const response = await fetch('./data/inflation_data.json', {
            method: 'GET'
        });
        this.inflationData = await response.json();
    }

    /**
     * Calculates inflation between two dates.
     * @param {number} from_year calculate inflation starting from this year
     * @param {string} from_month calculate inflation starting from this month
     * @param {number} to_year calculate inflation level in this year
     * @param {string} to_month calculate inflation level in this month
     * @returns {number} inflation
     */
    public Calculate(from_year: number, from_month: string, to_year: number, to_month: string): number {
        const from_inflation = this.inflationData[from_year][from_month];
        const to_inflation = this.inflationData[to_year][to_month];

        return to_inflation / from_inflation;
    }
}