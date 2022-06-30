import assert from 'assert';
import { Provider, TransactionResponse } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { BigNumber, CallOverrides, getDefaultProvider, PayableOverrides, utils, Wallet } from 'ethers';
import { suite, suiteSetup, test } from 'mocha';
import { Swivel } from '../../src/contracts/index.js';
import { parseOrder } from '../../src/helpers/index.js';
import { Protocols } from '../../src/types/index.js';
import { ADDRESSES, assertGetter, mockMethod, mockOrder, mockResponse, mockSignature, NETWORK, VERIFYING_CONTRACT } from '../test-helpers/index.js';

suite('swivel', () => {

    const callOverrides: CallOverrides = {
        gasLimit: '1000',
        from: '0xfrom',
        nonce: 1,
    };

    const payableOverrides: PayableOverrides = {
        gasLimit: '100000',
        nonce: 2,
    };

    let provider: Provider;
    let signer: Signer;

    suiteSetup(() => {

        provider = getDefaultProvider(NETWORK);
        signer = Wallet.createRandom().connect(provider);
    });

    test('create instance', () => {

        const swivel = new Swivel(ADDRESSES.SWIVEL, signer);

        assert(swivel instanceof Swivel);

        assert.strictEqual(swivel.address, ADDRESSES.SWIVEL);
    });

    suite('signOrder', () => {

        test('static method signs order', async () => {

            const order = mockOrder();
            const signature = await Swivel.signOrder(order, signer, VERIFYING_CONTRACT, NETWORK);

            assert(typeof signature === 'string');
            assert(signature.length > 0);
            assert(signature.startsWith('0x'));
        });

        test('instance method signs order', async () => {

            const swivel = new Swivel(VERIFYING_CONTRACT, signer);
            const order = mockOrder();
            const signature = await swivel.signOrder(order);

            assert(typeof signature === 'string');
            assert(signature.length > 0);
            assert(signature.startsWith('0x'));
        });
    });

    suite('NAME', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Swivel(ADDRESSES.SWIVEL, signer),
                'NAME',
                'Swivel Finance',
                callOverrides,
            );
        });
    });

    suite('VERSION', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Swivel(ADDRESSES.SWIVEL, signer),
                'VERSION',
                '3.0',
                callOverrides,
            );
        });
    });

    suite('HOLD', () => {

        // HOLD has an additional conversion step where the HOC converts the contract result
        // the assertGetter helper doesn't test result conversion

        test('converts and unwraps result and accepts transaction overrides', async () => {

            const expected = '1656526007';

            const swivel = new Swivel(ADDRESSES.SWIVEL, signer);
            const HOLD = mockMethod<BigNumber>(swivel, 'HOLD');
            HOLD.resolves([BigNumber.from(expected)]);

            let result = await swivel.HOLD();

            assert.strictEqual(result, expected);
            assert(HOLD.calledOnce);

            let args = HOLD.getCall(0).args;

            assert.strictEqual(args.length, 1);

            let [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, {});

            // call with transaction overrides

            result = await swivel.HOLD(callOverrides);

            assert.strictEqual(result, expected);
            assert(HOLD.calledTwice);

            args = HOLD.getCall(1).args;

            assert.strictEqual(args.length, 1);

            [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, callOverrides);
        });
    });

    suite('MIN_FEENOMINATOR', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Swivel(ADDRESSES.SWIVEL, signer),
                'MIN_FEENOMINATOR',
                100,
                callOverrides,
            );
        });
    });

    suite('domain', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Swivel(ADDRESSES.SWIVEL, signer),
                'domain',
                '0xdomainHash',
                callOverrides,
            );
        });
    });

    suite('admin', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Swivel(ADDRESSES.SWIVEL, signer),
                'admin',
                '0xadmin',
                callOverrides,
            );
        });
    });

    suite('marketPlace', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Swivel(ADDRESSES.SWIVEL, signer),
                'marketPlace',
                '0xmarketPlace',
                callOverrides,
            );
        });
    });

    suite('marketPlace', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Swivel(ADDRESSES.SWIVEL, signer),
                'marketPlace',
                '0xmarketPlace',
                callOverrides,
            );
        });
    });

    suite('aaveAddr', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Swivel(ADDRESSES.SWIVEL, signer),
                'aaveAddr',
                '0xaave',
                callOverrides,
            );
        });
    });

    suite('feenominators', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            const expected = [100, 200, 300, 400] as const;

            const swivel = new Swivel(ADDRESSES.SWIVEL, signer);
            const feenominators = mockMethod<[number, number, number, number]>(swivel, 'feenominators');
            feenominators.resolves(expected);

            let result = await swivel.feenominators();

            assert.deepStrictEqual(result, expected);
            assert(feenominators.calledOnce);

            let args = feenominators.getCall(0).args;

            assert.strictEqual(args.length, 1);

            let [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, {});

            // call with transaction overrides

            result = await swivel.feenominators(callOverrides);

            assert.deepStrictEqual(result, expected);
            assert(feenominators.calledTwice);

            args = feenominators.getCall(1).args;

            assert.strictEqual(args.length, 1);

            [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, callOverrides);
        });
    });

    suite('cancelled', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            const orderKey = '0xorderKey';
            const expected = true;

            const swivel = new Swivel(ADDRESSES.SWIVEL, signer);
            const cancelled = mockMethod<boolean>(swivel, 'cancelled');
            cancelled.resolves([expected]);

            let result = await swivel.cancelled(orderKey);

            assert.strictEqual(result, expected);
            assert(cancelled.calledOnce);

            let args = cancelled.getCall(0).args;

            assert.strictEqual(args.length, 2);

            let [passedOrderKey, passedOverrides] = args;

            assert.strictEqual(passedOrderKey, orderKey);
            assert.deepStrictEqual(passedOverrides, {});

            // call with transaction overrides

            result = await swivel.cancelled(orderKey, callOverrides);

            assert.strictEqual(result, expected);
            assert(cancelled.calledTwice);

            args = cancelled.getCall(1).args;

            assert.strictEqual(args.length, 2);

            [passedOrderKey, passedOverrides] = args;

            assert.strictEqual(passedOrderKey, orderKey);
            assert.deepStrictEqual(passedOverrides, callOverrides);
        });
    });

    suite('filled', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            const orderKey = '0xorderKey';
            const expected = '1000000';

            const swivel = new Swivel(ADDRESSES.SWIVEL, signer);
            const filled = mockMethod<BigNumber>(swivel, 'filled');
            filled.resolves([BigNumber.from(expected)]);

            let result = await swivel.filled(orderKey);

            assert.strictEqual(result, expected);
            assert(filled.calledOnce);

            let args = filled.getCall(0).args;

            assert.strictEqual(args.length, 2);

            let [passedOrderKey, passedOverrides] = args;

            assert.strictEqual(passedOrderKey, orderKey);
            assert.deepStrictEqual(passedOverrides, {});

            // call with transaction overrides

            result = await swivel.filled(orderKey, callOverrides);

            assert.strictEqual(result, expected);
            assert(filled.calledTwice);

            args = filled.getCall(1).args;

            assert.strictEqual(args.length, 2);

            [passedOrderKey, passedOverrides] = args;

            assert.strictEqual(passedOrderKey, orderKey);
            assert.deepStrictEqual(passedOverrides, callOverrides);
        });
    });

    suite('withdrawals', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            const orderKey = '0xorderKey';
            const expected = '1656526007';

            const swivel = new Swivel(ADDRESSES.SWIVEL, signer);
            const withdrawals = mockMethod<BigNumber>(swivel, 'withdrawals');
            withdrawals.resolves([BigNumber.from(expected)]);

            let result = await swivel.withdrawals(orderKey);

            assert.strictEqual(result, expected);
            assert(withdrawals.calledOnce);

            let args = withdrawals.getCall(0).args;

            assert.strictEqual(args.length, 2);

            let [passedOrderKey, passedOverrides] = args;

            assert.strictEqual(passedOrderKey, orderKey);
            assert.deepStrictEqual(passedOverrides, {});

            // call with transaction overrides

            result = await swivel.withdrawals(orderKey, callOverrides);

            assert.strictEqual(result, expected);
            assert(withdrawals.calledTwice);

            args = withdrawals.getCall(1).args;

            assert.strictEqual(args.length, 2);

            [passedOrderKey, passedOverrides] = args;

            assert.strictEqual(passedOrderKey, orderKey);
            assert.deepStrictEqual(passedOverrides, callOverrides);
        });
    });

    suite('initiate', () => {

        const orders = [
            mockOrder(),
            mockOrder({ key: '0x237a279f3fe76de9e357639cebb958a11d208e5d6f1ba872553796055cc4abdb' }),
        ];

        const amounts = [
            '50000',
            '25000',
        ];

        const signatures = [
            mockSignature(),
            mockSignature(),
        ];

        test('converts arguments', async () => {

            const swivel = new Swivel(VERIFYING_CONTRACT, signer);

            const initiate = mockMethod<TransactionResponse>(swivel, 'initiate');
            const response = mockResponse();
            initiate.resolves(response);

            const result = await swivel.initiate(orders, amounts, signatures);

            assert.strictEqual(result.hash, response.hash);
            assert(initiate.calledOnce);

            const args = initiate.getCall(0).args;

            assert.strictEqual(args.length, 4);

            const [passedOrders, passedAmounts, passedSignatures, passedOverrides] = args;

            assert.deepStrictEqual(passedOrders, orders.map(order => parseOrder(order)));
            assert.deepStrictEqual(passedAmounts, amounts.map(amount => BigNumber.from(amount)));
            assert.deepStrictEqual(passedSignatures, signatures.map(signature => utils.splitSignature(signature)));
            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const swivel = new Swivel(VERIFYING_CONTRACT, signer);

            const initiate = mockMethod<TransactionResponse>(swivel, 'initiate');
            const response = mockResponse();
            initiate.resolves(response);

            const result = await swivel.initiate(orders, amounts, signatures, payableOverrides);

            assert.strictEqual(result.hash, response.hash);
            assert(initiate.calledOnce);

            const args = initiate.getCall(0).args;

            assert.strictEqual(args.length, 4);

            const [passedOrders, passedAmounts, passedSignatures, passedOverrides] = args;

            assert.deepStrictEqual(passedOrders, orders.map(order => parseOrder(order)));
            assert.deepStrictEqual(passedAmounts, amounts.map(amount => BigNumber.from(amount)));
            assert.deepStrictEqual(passedSignatures, signatures.map(signature => utils.splitSignature(signature)));
            assert.deepStrictEqual(passedOverrides, payableOverrides);
        });
    });

    suite('exit', () => {

        const orders = [
            mockOrder({ exit: false }),
            mockOrder({ key: '0x237a279f3fe76de9e357639cebb958a11d208e5d6f1ba872553796055cc4abdb', exit: false }),
        ];

        const amounts = [
            '50000',
            '25000',
        ];

        const signatures = [
            mockSignature(),
            mockSignature(),
        ];

        test('converts arguments', async () => {

            const swivel = new Swivel(ADDRESSES.SWIVEL, signer);

            const exit = mockMethod<TransactionResponse>(swivel, 'exit');
            const response = mockResponse();
            exit.resolves(response);

            const result = await swivel.exit(orders, amounts, signatures);

            assert.strictEqual(result.hash, response.hash);
            assert(exit.calledOnce);

            const args = exit.getCall(0).args;

            assert.strictEqual(args.length, 4);

            const [passedOrders, passedAmounts, passedSignatures, passedOverrides] = args;

            assert.deepStrictEqual(passedOrders, orders.map(order => parseOrder(order)));
            assert.deepStrictEqual(passedAmounts, amounts.map(amount => BigNumber.from(amount)));
            assert.deepStrictEqual(passedSignatures, signatures.map(signature => utils.splitSignature(signature)));
            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const swivel = new Swivel(ADDRESSES.SWIVEL, signer);

            const exit = mockMethod<TransactionResponse>(swivel, 'exit');
            const response = mockResponse();
            exit.resolves(response);

            const result = await swivel.exit(orders, amounts, signatures, payableOverrides);

            assert.strictEqual(result.hash, response.hash);
            assert(exit.calledOnce);

            const args = exit.getCall(0).args;

            assert.strictEqual(args.length, 4);

            const [passedOrders, passedAmounts, passedSignatures, passedOverrides] = args;

            assert.deepStrictEqual(passedOrders, orders.map(order => parseOrder(order)));
            assert.deepStrictEqual(passedAmounts, amounts.map(amount => BigNumber.from(amount)));
            assert.deepStrictEqual(passedSignatures, signatures.map(signature => utils.splitSignature(signature)));
            assert.deepStrictEqual(passedOverrides, payableOverrides);
        });
    });

    suite('cancel', () => {

        const order = mockOrder();
        const signature = mockSignature();

        test('converts arguments', async () => {

            const swivel = new Swivel(VERIFYING_CONTRACT, signer);

            const cancel = mockMethod<TransactionResponse>(swivel, 'cancel');
            const response = mockResponse();
            cancel.resolves(response);

            const result = await swivel.cancel(order, signature);

            assert.strictEqual(result.hash, response.hash);
            assert(cancel.calledOnce);

            const args = cancel.getCall(0).args;

            assert.strictEqual(args.length, 3);

            const [passedOrders, passedSignatures, passedOverrides] = args;

            assert.deepStrictEqual(passedOrders, parseOrder(order));
            assert.deepStrictEqual(passedSignatures, utils.splitSignature(signature));
            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const swivel = new Swivel(VERIFYING_CONTRACT, signer);

            const cancel = mockMethod<TransactionResponse>(swivel, 'cancel');
            const response = mockResponse();
            cancel.resolves(response);

            const result = await swivel.cancel(order, signature, payableOverrides);

            assert.strictEqual(result.hash, response.hash);
            assert(cancel.calledOnce);

            const args = cancel.getCall(0).args;

            assert.strictEqual(args.length, 3);

            const [passedOrders, passedSignatures, passedOverrides] = args;

            assert.deepStrictEqual(passedOrders, parseOrder(order));
            assert.deepStrictEqual(passedSignatures, utils.splitSignature(signature));
            assert.deepStrictEqual(passedOverrides, payableOverrides);
        });
    });

    suite('splitUnderlying', () => {

        const protocol = Protocols.Erc4626;
        const underlying = '0xunderlying';
        const maturity = '1656526007';
        const amount = '1000000';

        test('converts arguments', async () => {

            const swivel = new Swivel(ADDRESSES.SWIVEL, signer);

            const splitUnderlying = mockMethod<TransactionResponse>(swivel, 'splitUnderlying');
            const response = mockResponse();
            splitUnderlying.resolves(response);

            const result = await swivel.splitUnderlying(protocol, underlying, maturity, amount);

            assert.strictEqual(result.hash, response.hash);
            assert(splitUnderlying.calledOnce);

            const args = splitUnderlying.getCall(0).args;

            assert.strictEqual(args.length, 5);

            const [passedProtocol, passedUnderlying, passedMaturity, passedAmount, passedOverrides] = args;

            assert.strictEqual(passedProtocol, protocol);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const swivel = new Swivel(ADDRESSES.SWIVEL, signer);

            const splitUnderlying = mockMethod<TransactionResponse>(swivel, 'splitUnderlying');
            const response = mockResponse();
            splitUnderlying.resolves(response);

            const result = await swivel.splitUnderlying(protocol, underlying, maturity, amount, payableOverrides);

            assert.strictEqual(result.hash, response.hash);
            assert(splitUnderlying.calledOnce);

            const args = splitUnderlying.getCall(0).args;

            assert.strictEqual(args.length, 5);

            const [passedProtocol, passedUnderlying, passedMaturity, passedAmount, passedOverrides] = args;

            assert.strictEqual(passedProtocol, protocol);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedOverrides, payableOverrides);
        });
    });

    suite('combineTokens', () => {

        const protocol = Protocols.Erc4626;
        const underlying = '0xunderlying';
        const maturity = '1656526007';
        const amount = '1000000';

        test('converts arguments', async () => {

            const swivel = new Swivel(ADDRESSES.SWIVEL, signer);

            const combineTokens = mockMethod<TransactionResponse>(swivel, 'combineTokens');
            const response = mockResponse();
            combineTokens.resolves(response);

            const result = await swivel.combineTokens(protocol, underlying, maturity, amount);

            assert.strictEqual(result.hash, response.hash);
            assert(combineTokens.calledOnce);

            const args = combineTokens.getCall(0).args;

            assert.strictEqual(args.length, 5);

            const [passedProtocol, passedUnderlying, passedMaturity, passedAmount, passedOverrides] = args;

            assert.strictEqual(passedProtocol, protocol);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const swivel = new Swivel(ADDRESSES.SWIVEL, signer);

            const combineTokens = mockMethod<TransactionResponse>(swivel, 'combineTokens');
            const response = mockResponse();
            combineTokens.resolves(response);

            const result = await swivel.combineTokens(protocol, underlying, maturity, amount, payableOverrides);

            assert.strictEqual(result.hash, response.hash);
            assert(combineTokens.calledOnce);

            const args = combineTokens.getCall(0).args;

            assert.strictEqual(args.length, 5);

            const [passedProtocol, passedUnderlying, passedMaturity, passedAmount, passedOverrides] = args;

            assert.strictEqual(passedProtocol, protocol);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedOverrides, payableOverrides);
        });
    });

    suite('redeemZcToken', () => {

        const protocol = Protocols.Erc4626;
        const underlying = '0xunderlying';
        const maturity = '1656526007';
        const amount = '1000000';

        test('converts arguments', async () => {

            const swivel = new Swivel(ADDRESSES.SWIVEL, signer);

            const redeemZcToken = mockMethod<TransactionResponse>(swivel, 'redeemZcToken');
            const response = mockResponse();
            redeemZcToken.resolves(response);

            const result = await swivel.redeemZcToken(protocol, underlying, maturity, amount);

            assert.strictEqual(result.hash, response.hash);
            assert(redeemZcToken.calledOnce);

            const args = redeemZcToken.getCall(0).args;

            assert.strictEqual(args.length, 5);

            const [passedProtocol, passedUnderlying, passedMaturity, passedAmount, passedOverrides] = args;

            assert.strictEqual(passedProtocol, protocol);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const swivel = new Swivel(ADDRESSES.SWIVEL, signer);

            const redeemZcToken = mockMethod<TransactionResponse>(swivel, 'redeemZcToken');
            const response = mockResponse();
            redeemZcToken.resolves(response);

            const result = await swivel.redeemZcToken(protocol, underlying, maturity, amount, payableOverrides);

            assert.strictEqual(result.hash, response.hash);
            assert(redeemZcToken.calledOnce);

            const args = redeemZcToken.getCall(0).args;

            assert.strictEqual(args.length, 5);

            const [passedProtocol, passedUnderlying, passedMaturity, passedAmount, passedOverrides] = args;

            assert.strictEqual(passedProtocol, protocol);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedOverrides, payableOverrides);
        });
    });

    suite('redeemVaultInterest', () => {

        const protocol = Protocols.Erc4626;
        const underlying = '0xunderlying';
        const maturity = '1656526007';

        test('converts arguments', async () => {

            const swivel = new Swivel(ADDRESSES.SWIVEL, signer);

            const redeemVaultInterest = mockMethod<TransactionResponse>(swivel, 'redeemVaultInterest');
            const response = mockResponse();
            redeemVaultInterest.resolves(response);

            const result = await swivel.redeemVaultInterest(protocol, underlying, maturity);

            assert.strictEqual(result.hash, response.hash);
            assert(redeemVaultInterest.calledOnce);

            const args = redeemVaultInterest.getCall(0).args;

            assert.strictEqual(args.length, 4);

            const [passedProtocol, passedUnderlying, passedMaturity, passedOverrides] = args;

            assert.strictEqual(passedProtocol, protocol);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const swivel = new Swivel(ADDRESSES.SWIVEL, signer);

            const redeemVaultInterest = mockMethod<TransactionResponse>(swivel, 'redeemVaultInterest');
            const response = mockResponse();
            redeemVaultInterest.resolves(response);

            const result = await swivel.redeemVaultInterest(protocol, underlying, maturity, payableOverrides);

            assert.strictEqual(result.hash, response.hash);
            assert(redeemVaultInterest.calledOnce);

            const args = redeemVaultInterest.getCall(0).args;

            assert.strictEqual(args.length, 4);

            const [passedProtocol, passedUnderlying, passedMaturity, passedOverrides] = args;

            assert.strictEqual(passedProtocol, protocol);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedOverrides, payableOverrides);
        });
    });
});
