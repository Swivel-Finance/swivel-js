import assert from 'assert';
import { suite, test } from 'mocha';
import { BASE_DECIMALS, stringify } from '../../src/internal/rates/helpers/index.js';

suite('internal/helpers', () => {

    suite('stringify', () => {

        test('stringify number uses default decimals', () => {

            // 30 decimals
            const value = 0.123456789012345678901234567890;

            // default decimals are 26 (`BASE_DECIMALS`)
            const result = stringify(value);

            // the length is decimals plus 2 (nominal digit plus decimal point plus fraction digits)
            assert.strictEqual(result.length, 2 + BASE_DECIMALS);
        });

        test('stringify number can use custom decimals', () => {

            // 30 decimals
            const value = 0.123456789012345678901234567890;
            const result = stringify(value, 5);

            // the length is decimals plus 2 (nominal digit plus decimal point plus fraction digits)
            assert.strictEqual(result.length, 7);
        });

        test('stringify number removes exponential notation', () => {

            const value = 5e-26;
            const result = stringify(value);

            assert.strictEqual(result, '0.00000000000000000000000005');
        });

        test('stringify number removes trailing zeros', () => {

            // 0.050.toFixed(10) would return '0.0500000000'
            let value = 0.050;
            let result = stringify(value, 10);

            assert.strictEqual(result, '0.05');

            // 0.5e-20.toFixed(26) would return '0.00000000000000000000500000'
            value = 0.5e-20;
            result = stringify(value);

            assert.strictEqual(result, '0.000000000000000000005');

            // (0).toFixed(26) would return '0.00000000000000000000000000'
            value = 0;
            result = stringify(value);

            assert.strictEqual(result, '0.0');

            // (1).toFixed(26) would return '1.00000000000000000000000000'
            value = 1;
            result = stringify(value);

            assert.strictEqual(result, '1.0');
        });
    });
});
