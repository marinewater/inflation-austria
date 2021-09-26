import { assert } from 'chai';
import 'mocha';

import { Inflation } from '../src/inflation';

describe('Inflation', () => {
    describe('Calculate', () => {
        it('should calculate inflation between 2015 and 2020', () => {
            const inflation = new Inflation();
            inflation.inflationData = {"2015":{"April":5638.1,"August":5627.9,"Dezember":5668.6,"Februar":5566.8,"Juli":5638.1,"Juni":5658.4,"Jänner":5551.6,"Mai":5653.3,"März":5633,"November":5648.2,"Oktober":5643.1,"September":5648.2,"Ø":5631.3},"2020":{"April":6087.4,"August":6081.8,"Dezember":6160.6,"Februar":6070.5,"Juli":6093.1,"Juni":6081.8,"Jänner":6059.3,"Mai":6048,"März":6087.4,"November":6126.9,"Oktober":6115.6,"September":6110,"Ø":6093.5}};
            assert.strictEqual(inflation.Calculate(2015, 'April', 2020, 'Mai'), 1.0727017967045636);
        });
    });
});