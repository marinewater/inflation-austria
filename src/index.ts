import { Listeners } from './listeners';
import { Inflation } from './inflation';

async function main() {

    const inflation = new Inflation();
    await inflation.GetData();

    const listeners = new Listeners(inflation);
    listeners.addYears();
    listeners.addListeners();

}

main()
    .catch(e => console.error(e));