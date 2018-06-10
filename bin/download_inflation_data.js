"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inflation_data_1 = require("../lib/inflation_data");
function main() {
    const i = new inflation_data_1.InflationData();
    i.start()
        .then(() => console.log('done'))
        .then(() => process.exit(0))
        .catch(error => console.log(error));
}
main();
