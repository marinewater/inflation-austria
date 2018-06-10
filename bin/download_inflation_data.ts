import { InflationData } from '../lib/inflation_data';


function main() {

    const i = new InflationData();
    i.save()
        .then( () => console.log( 'done' ) )
        .then( () => process.exit( 0 ) )
        .catch( error => console.log( error ) );

}

main();