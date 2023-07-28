import assert from 'assert';
import { Provider, TransactionResponse } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { BigNumber, CallOverrides, getDefaultProvider, PayableOverrides, utils, Wallet } from 'ethers';
import { suite, suiteSetup, test } from 'mocha';
import { MarketPlace, MarketResponse } from '../../src/contracts/index.js';
import { Market, Protocols } from '../../src/types/index.js';
import { ADDRESSES, assertGetter, mockExecutor, mockMethod, mockResponse } from '../test-helpers/index.js';

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

        const protocol = Protocols.Frax;
        const underlying = '0xunderlying';
        const maturity = '1656526007';

        // a mocked market response
        const mockResult = {
            cTokenAddr: '0xcToken',
            zcToken: '0xzcToken',
            vaultTracker: '0xvaultTracker',
            maturityRate: BigNumber.from(1),
        } as MarketResponse;

        // an expected market result
        const expected: Market = {
            cTokenAddr: '0xcToken',
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

    suite('rates', () => {

        const protocol = Protocols.Euler;
        const underlying = '0xunderlying';
        const maturity = '1656526007';

        // an expected maturity rate and exchange rate
        const expected = ['2134302304750123', '2134302304750123'];

        test('unwraps and converts result', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKET_PLACE, provider);

            // rates returns a tuple of uint256 which ethers will convert to BigNumbers
            // we create a mock result with BigNumbers and assert the HOC converts them to strings
            const rates = mockMethod<[BigNumber, BigNumber]>(marketplace, 'rates');
            rates.resolves([BigNumber.from(expected[0]), BigNumber.from(expected[1])]);

            const result = await marketplace.rates(protocol, underlying, maturity);

            assert.deepStrictEqual(result, expected);
            assert(rates.calledOnce);

            const args = rates.getCall(0).args;

            assert.strictEqual(args.length, 4);

            const [passedProtocol, passedUnderlying, passedMaturity, passedOverrides] = args;

            assert.strictEqual(passedProtocol, protocol);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKET_PLACE, provider);

            // rates returns a tuple of uint256 which ethers will convert to BigNumbers
            // we create a mock result with BigNumbers and assert the HOC converts them to strings
            const rates = mockMethod<[BigNumber, BigNumber]>(marketplace, 'rates');
            rates.resolves([BigNumber.from(expected[0]), BigNumber.from(expected[1])]);

            const result = await marketplace.rates(protocol, underlying, maturity, callOverrides);

            assert.deepStrictEqual(result, expected);
            assert(rates.calledOnce);

            const args = rates.getCall(0).args;

            assert.strictEqual(args.length, 4);

            const [passedProtocol, passedUnderlying, passedMaturity, passedOverrides] = args;

            assert.strictEqual(passedProtocol, protocol);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedOverrides, callOverrides);
        });
    });

    suite('exchangeRate', () => {

        const protocol = Protocols.Compound;
        const address = '0xcTokenAddress';

        const expected = '21382742901237490012';

        test('converts arguments, unwraps and converts result', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKET_PLACE, provider);

            const exchangeRate = mockMethod<string>(marketplace, 'exchangeRate');
            exchangeRate.resolves([expected]);

            const result = await marketplace.exchangeRate(protocol, address);

            assert.deepStrictEqual(result, expected);
            assert(exchangeRate.calledOnce);

            const args = exchangeRate.getCall(0).args;

            assert.strictEqual(args.length, 3);

            const [passedProtocol, passedAddress, passedOverrides] = args;

            assert.strictEqual(passedProtocol, protocol);
            assert.strictEqual(passedAddress, address);
            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKET_PLACE, provider);

            const exchangeRate = mockMethod<string>(marketplace, 'exchangeRate');
            exchangeRate.resolves([expected]);

            const result = await marketplace.exchangeRate(protocol, address, callOverrides);

            assert.deepStrictEqual(result, expected);
            assert(exchangeRate.calledOnce);

            const args = exchangeRate.getCall(0).args;

            assert.strictEqual(args.length, 3);

            const [passedProtocol, passedAddress, passedOverrides] = args;

            assert.strictEqual(passedProtocol, protocol);
            assert.strictEqual(passedAddress, address);
            assert.deepStrictEqual(passedOverrides, callOverrides);
        });
    });

    suite('cTokenAddress', () => {

        const protocol = Protocols.Compound;
        const underlying = '0xunderlying';
        const maturity = '1656526007';

        const expected = '0xcToken';

        test('converts arguments, unwraps and converts result', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKET_PLACE, provider);

            const cTokenAddress = mockMethod<string>(marketplace, 'cTokenAddress');
            cTokenAddress.resolves([expected]);

            const result = await marketplace.cTokenAddress(protocol, underlying, maturity);

            assert.deepStrictEqual(result, expected);
            assert(cTokenAddress.calledOnce);

            const args = cTokenAddress.getCall(0).args;

            assert.strictEqual(args.length, 4);

            const [passedProtocol, passedUnderlying, passedMaturity, passedOverrides] = args;

            assert.strictEqual(passedProtocol, protocol);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKET_PLACE, provider);

            const cTokenAddress = mockMethod<string>(marketplace, 'cTokenAddress');
            cTokenAddress.resolves([expected]);

            const result = await marketplace.cTokenAddress(protocol, underlying, maturity, callOverrides);

            assert.deepStrictEqual(result, expected);
            assert(cTokenAddress.calledOnce);

            const args = cTokenAddress.getCall(0).args;

            assert.strictEqual(args.length, 4);

            const [passedProtocol, passedUnderlying, passedMaturity, passedOverrides] = args;

            assert.strictEqual(passedProtocol, protocol);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedOverrides, callOverrides);
        });
    });

    suite('matureMarket', () => {

        const protocol = Protocols.Frax;
        const underlying = '0xunderlying';
        const maturity = '1656526007';

        test('converts arguments', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKET_PLACE, signer, mockExecutor());

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

            const marketplace = new MarketPlace(ADDRESSES.MARKET_PLACE, signer, mockExecutor());

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

        const protocol = Protocols.Frax;
        const underlying = '0xunderlying';
        const maturity = '1656526007';
        const receiver = '0xreceiver';
        const amount = utils.parseEther('100').toString();

        test('converts arguments', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKET_PLACE, signer, mockExecutor());

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

            const marketplace = new MarketPlace(ADDRESSES.MARKET_PLACE, signer, mockExecutor());

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
