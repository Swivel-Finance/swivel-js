import assert from 'assert';
import { Provider, TransactionResponse } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { BigNumber, CallOverrides, getDefaultProvider, PayableOverrides, utils, Wallet } from 'ethers';
import { suite, suiteSetup, test } from 'mocha';
import { MarketPlace, MarketResponse } from '../../src/contracts/index.js';
import { Market, Protocols } from '../../src/types/index.js';
import { ADDRESSES, assertGetter, mockMethod, mockResponse } from '../test-helpers/index.js';

suite('marketplace', () => {

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

        provider = getDefaultProvider();
        signer = Wallet.createRandom().connect(provider);
    });

    test('create instance', () => {

        const marketplace = new MarketPlace(ADDRESSES.MARKET_PLACE, provider);

        assert(marketplace instanceof MarketPlace);

        assert.strictEqual(marketplace.address, ADDRESSES.MARKET_PLACE);
    });

    suite('admin', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new MarketPlace(ADDRESSES.MARKET_PLACE, provider),
                'admin',
                '0xadmin',
                callOverrides,
            );
        });
    });

    suite('swivel', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new MarketPlace(ADDRESSES.MARKET_PLACE, provider),
                'swivel',
                '0xswivel',
                callOverrides,
            );
        });
    });

    suite('paused', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new MarketPlace(ADDRESSES.MARKET_PLACE, provider),
                'paused',
                false,
                callOverrides,
            );
        });
    });

    suite('markets', () => {

        const protocol = Protocols.Erc4626;
        const underlying = '0xunderlying';
        const maturity = '1656526007';

        // a mocked market response
        const mockResult = {
            cTokenAddr: '0xcToken',
            adapterAddr: '0xadapter',
            zcToken: '0xzcToken',
            vaultTracker: '0xvaultTracker',
            maturityRate: BigNumber.from(1),
        } as MarketResponse;

        // an expected market result
        const expected: Market = {
            cTokenAddr: '0xcToken',
            adapterAddr: '0xadapter',
            zcToken: '0xzcToken',
            vaultTracker: '0xvaultTracker',
            maturityRate: '1',
        };

        test('converts arguments, unwraps and converts result', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKET_PLACE, provider);

            // markets returns a struct, so ethers will return a struct
            // we create a mock result with a MarketResponse and assert the HOC converts it to Market
            const markets = mockMethod<MarketResponse>(marketplace, 'markets');
            markets.resolves(mockResult);

            const result = await marketplace.markets(protocol, underlying, maturity);

            assert.deepStrictEqual(result, expected);
            assert(markets.calledOnce);

            const args = markets.getCall(0).args;

            assert.strictEqual(args.length, 4);

            const [passedProtocol, passedUnderlying, passedMaturity, passedOverrides] = args;

            assert.strictEqual(passedProtocol, protocol);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKET_PLACE, provider);

            // markets returns a struct, so ethers will return a struct
            // we create a mock result with a MarketResponse and assert the HOC converts it to Market
            const markets = mockMethod<MarketResponse>(marketplace, 'markets');
            markets.resolves(mockResult);

            const result = await marketplace.markets(protocol, underlying, maturity, callOverrides);

            assert.deepStrictEqual(result, expected);
            assert(markets.calledOnce);

            const args = markets.getCall(0).args;

            assert.strictEqual(args.length, 4);

            const [passedProtocol, passedUnderlying, passedMaturity, passedOverrides] = args;

            assert.strictEqual(passedProtocol, protocol);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedOverrides, callOverrides);
        });
    });

    suite('cTokenAndAdapterAddress', () => {

        const protocol = Protocols.Compound;
        const underlying = '0xunderlying';
        const maturity = '1656526007';

        // an expected tuple result
        const expected = [
            '0xcToken',
            '0xadapter',
        ] as const;

        test('converts arguments, unwraps and converts result', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKET_PLACE, provider);

            // cTokenAndAdapterAddress returns a tuple, so ethers will return a tuple
            // we create a mock result with a tuple and assert the HOC converts it
            const cTokenAndAdapterAddress = mockMethod<[string, string]>(marketplace, 'cTokenAndAdapterAddress');
            cTokenAndAdapterAddress.resolves(expected);

            const result = await marketplace.cTokenAndAdapterAddress(protocol, underlying, maturity);

            assert.deepStrictEqual(result, expected);
            assert(cTokenAndAdapterAddress.calledOnce);

            const args = cTokenAndAdapterAddress.getCall(0).args;

            assert.strictEqual(args.length, 4);

            const [passedProtocol, passedUnderlying, passedMaturity, passedOverrides] = args;

            assert.strictEqual(passedProtocol, protocol);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKET_PLACE, provider);

            // cTokenAndAdapterAddress returns a struct, so ethers will return a struct
            // we create a mock result with a MarketResponse and assert the HOC converts it to Market
            const cTokenAndAdapterAddress = mockMethod<[string, string]>(marketplace, 'cTokenAndAdapterAddress');
            cTokenAndAdapterAddress.resolves(expected);

            const result = await marketplace.cTokenAndAdapterAddress(protocol, underlying, maturity, callOverrides);

            assert.deepStrictEqual(result, expected);
            assert(cTokenAndAdapterAddress.calledOnce);

            const args = cTokenAndAdapterAddress.getCall(0).args;

            assert.strictEqual(args.length, 4);

            const [passedProtocol, passedUnderlying, passedMaturity, passedOverrides] = args;

            assert.strictEqual(passedProtocol, protocol);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedOverrides, callOverrides);
        });
    });

    suite('matureMarket', () => {

        const protocol = Protocols.Erc4626;
        const underlying = '0xunderlying';
        const maturity = '1656526007';

        test('converts arguments', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKET_PLACE, signer);

            const matureMarket = mockMethod<TransactionResponse>(marketplace, 'matureMarket');
            const response = mockResponse();
            matureMarket.resolves(response);

            const result = await marketplace.matureMarket(protocol, underlying, maturity);

            assert.strictEqual(result.hash, response.hash);
            assert(matureMarket.calledOnce);

            const args = matureMarket.getCall(0).args;

            assert.strictEqual(args.length, 4);

            const [passedProtocol, passedUnderlying, passedMaturity, passedOverrides] = args;

            assert.strictEqual(passedProtocol, protocol);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKET_PLACE, signer);

            const matureMarket = mockMethod<TransactionResponse>(marketplace, 'matureMarket');
            const response = mockResponse();
            matureMarket.resolves(response);

            const result = await marketplace.matureMarket(protocol, underlying, maturity, payableOverrides);

            assert.strictEqual(result.hash, response.hash);
            assert(matureMarket.calledOnce);

            const args = matureMarket.getCall(0).args;

            assert.strictEqual(args.length, 4);

            const [passedProtocol, passedUnderlying, passedMaturity, passedOverrides] = args;

            assert.strictEqual(passedProtocol, protocol);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedOverrides, payableOverrides);
        });
    });

    suite('transferVaultNotional', () => {

        const protocol = Protocols.Erc4626;
        const underlying = '0xunderlying';
        const maturity = '1656526007';
        const receiver = '0xreceiver';
        const amount = utils.parseEther('100').toString();

        test('converts arguments', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKET_PLACE, signer);

            const transferVaultNotional = mockMethod<TransactionResponse>(marketplace, 'transferVaultNotional');
            const response = mockResponse();
            transferVaultNotional.resolves(response);

            const result = await marketplace.transferVaultNotional(protocol, underlying, maturity, receiver, amount);

            assert.strictEqual(result.hash, response.hash);
            assert(transferVaultNotional.calledOnce);

            const args = transferVaultNotional.getCall(0).args;

            assert.strictEqual(args.length, 6);

            const [passedProtocol, passedUnderlying, passedMaturity, passedReceiver, passedAmount, passedOverrides] = args;

            assert.strictEqual(passedProtocol, protocol);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.strictEqual(passedReceiver, receiver);
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKET_PLACE, signer);

            const transferVaultNotional = mockMethod<TransactionResponse>(marketplace, 'transferVaultNotional');
            const response = mockResponse();
            transferVaultNotional.resolves(response);

            const result = await marketplace.transferVaultNotional(protocol, underlying, maturity, receiver, amount, payableOverrides);

            assert.strictEqual(result.hash, response.hash);
            assert(transferVaultNotional.calledOnce);

            const args = transferVaultNotional.getCall(0).args;

            assert.strictEqual(args.length, 6);

            const [passedProtocol, passedUnderlying, passedMaturity, passedReceiver, passedAmount, passedOverrides] = args;

            assert.strictEqual(passedProtocol, protocol);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.strictEqual(passedReceiver, receiver);
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedOverrides, payableOverrides);
        });
    });
});