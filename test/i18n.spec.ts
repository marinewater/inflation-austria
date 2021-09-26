import { assert } from 'chai';
import 'mocha';

import { translate_month } from '../src/i18n';

describe( 'translate_month', function () {
    it('should translate März to English', function () {
        assert.strictEqual(translate_month('en', 'März'), 'March');
    });

    it('should translate März to German', function () {
        assert.strictEqual(translate_month('de', 'März'), 'März');
    });

    it('should translate Ø to English', function () {
        assert.strictEqual(translate_month('en', 'Ø'), 'Ø');
    });

    it('should translate Ø to German', function () {
        assert.strictEqual(translate_month('de', 'Ø'), 'Ø');
    });
});