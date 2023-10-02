import assert from 'assert';
import { TypedDataDomain } from '@ethersproject/abstract-signer';
import { BigNumber, utils } from 'ethers';
import { suite, test } from 'mocha';
import { DOMAIN_NAME, DOMAIN_VERSION } from '../../src/constants/index.js';
import { addGasLimitAdjustment, domain, GAS_LIMIT_DELTA, GAS_LIMIT_DELTA_COMPOUND, getGasLimitAdjustment, parseOrder, unwrap } from '../../src/helpers/index.js';
import { Protocols } from '../../src/types/index.js';
import { mockOrder, NETWORK, VERIFYING_CONTRACT } from '../test-helpers/index.js';

suite('helpers', () => {

    suite('domain', () => {

        test('create domain data for EIP-712 signing', () => {

            const chainId = NETWORK;
            const verifyingContract = VERIFYING_CONTRACT;

            const expected: TypedDataDomain = {
                name: DOMAIN_NAME,
                version: DOMAIN_VERSION,
                chainId,
                verifyingContract,
            };

            assert.deepStrictEqual(domain(chainId, verifyingContract), expected);
        });
    });

    suite('optimize', () => {

        test('gets the correct gas limit delta per protocol', () => {

            assert.strictEqual(getGasLimitAdjustment(Protocols.Aave).toString(), GAS_LIMIT_DELTA.toString(), 'should return the correct gas limit delta');
            assert.strictEqual(getGasLimitAdjustment(Protocols.Euler).toString(), GAS_LIMIT_DELTA.toString(), 'should return the correct gas limit delta');
            assert.strictEqual(getGasLimitAdjustment(Protocols.Frax).toString(), GAS_LIMIT_DELTA.toString(), 'should return the correct gas limit delta');
            assert.strictEqual(getGasLimitAdjustment(Protocols.Lido).toString(), GAS_LIMIT_DELTA.toString(), 'should return the correct gas limit delta');
            assert.strictEqual(getGasLimitAdjustment(Protocols.Rari).toString(), GAS_LIMIT_DELTA.toString(), 'should return the correct gas limit delta');
            assert.strictEqual(getGasLimitAdjustment(Protocols.Yearn).toString(), GAS_LIMIT_DELTA.toString(), 'should return the correct gas limit delta');
            assert.strictEqual(getGasLimitAdjustment(Protocols.Compound).toString(), GAS_LIMIT_DELTA_COMPOUND.toString(), 'should return the correct gas limit delta');
        });

        test('calculates the correct gas limit per protocol', () => {

            const estimated = BigNumber.from('200000');

            // Aave

            let adjustment = getGasLimitAdjustment(Protocols.Aave);
            let limit = addGasLimitAdjustment(estimated, adjustment);

            assert.strictEqual(limit._isBigNumber, true, 'should create a BigNumber instance');
            assert.strictEqual(limit.gt(estimated), true, 'the limit should be greater than the estimate');
            assert.strictEqual(limit.toNumber(), estimated.toNumber() + GAS_LIMIT_DELTA.toNumber(), `'the limit should be ${ GAS_LIMIT_DELTA.toNumber() } greater than the estimate'`);

            // Lido

            adjustment = getGasLimitAdjustment(Protocols.Lido);
            limit = addGasLimitAdjustment(estimated, adjustment);

            assert.strictEqual(limit._isBigNumber, true, 'should create a BigNumber instance');
            assert.strictEqual(limit.gt(estimated), true, 'the limit should be greater than the estimate');
            assert.strictEqual(limit.toNumber(), estimated.toNumber() + GAS_LIMIT_DELTA.toNumber(), `'the limit should be ${ GAS_LIMIT_DELTA.toNumber() } greater than the estimate'`);

            // Compound

            adjustment = getGasLimitAdjustment(Protocols.Compound);
            limit = addGasLimitAdjustment(estimated, adjustment);

            assert.strictEqual(limit._isBigNumber, true, 'should create a BigNumber instance');
            assert.strictEqual(limit.gt(estimated), true, 'the limit should be greater than the estimate');
            assert.strictEqual(limit.toNumber(), estimated.toNumber() + GAS_LIMIT_DELTA_COMPOUND.toNumber(), `'the limit should be ${ GAS_LIMIT_DELTA_COMPOUND.toNumber() } greater than the estimate'`);
        });
    });

    suite('order', () => {

        test('parse order', () => {

            const order = mockOrder();

            const parsed = parseOrder(order);

            assert.deepStrictEqual(parsed.key, utils.arrayify(order.key));
            assert.strictEqual(parsed.protocol, order.protocol);
            assert.strictEqual(parsed.maker, order.maker);
            assert.strictEqual(parsed.underlying, order.underlying);
            assert.strictEqual(parsed.vault, order.vault);
            assert.strictEqual(parsed.exit, order.exit);
            assert.deepStrictEqual(parsed.principal, BigNumber.from(order.principal));
            assert.deepStrictEqual(parsed.premium, BigNumber.from(order.premium));
            assert.deepStrictEqual(parsed.maturity, BigNumber.from(order.maturity));
            assert.deepStrictEqual(parsed.expiry, BigNumber.from(order.expiry));
        });
    });

    suite('result', () => {

        test('unwrap results', () => {

            // for simple return values

            assert.strictEqual(unwrap<string>(['test']), 'test');
            assert.strictEqual(unwrap<number>([1000]), 1000);
            assert.strictEqual(unwrap<boolean>([true]), true);

            // for tuples no unwrapping is done

            assert.deepStrictEqual(unwrap<[string, string]>(['foo', 'bar']), ['foo', 'bar']);
            assert.deepStrictEqual(unwrap<[number, number]>([1, 2]), [1, 2]);
            assert.deepStrictEqual(unwrap<[boolean, number]>([false, 0]), [false, 0]);

            // for named return parameters, the `Result` object includes the named key

            assert.strictEqual(unwrap<string>({ 0: 'test', name: 'test', length: 1 } as unknown as [string]), 'test');
            assert.strictEqual(unwrap<number>({ 0: 1000, name: 1000, length: 1 } as unknown as [number]), 1000);
            assert.strictEqual(unwrap<boolean>({ 0: true, name: true, length: 1 } as unknown as [boolean]), true);
        });
    });
});
