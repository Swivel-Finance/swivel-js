import { getDefaultProvider, Provider } from '@ethersproject/providers';
import { assert } from 'chai';
import { ethers, Signer, Wallet } from 'ethers';
import { stub } from 'sinon';
import { Market, MarketPlace, TxResponse } from '../src';
import { MISSING_CONTRACT_ADDRESS } from '../src/errors';
import { EthersMarketPlaceContract, EthersVendor, Result } from '../src/vendors/ethers';
import { TEST_HELPERS } from './test-helpers';

const assertThrows = async (marketPlace: MarketPlace, method: keyof MarketPlace, ...args: unknown[]) => {

    let error: string | undefined;
    let response: unknown;

    try {

        response = await (marketPlace[method] as (...args: unknown[]) => Promise<unknown>)(...args);

    } catch (e) {

        error = e as string;
    }

    assert.notOk(response);
    assert.strictEqual(error, MISSING_CONTRACT_ADDRESS('market-place'));
};

describe('MarketPlace', () => {

    let provider: Provider;
    let signer: Signer;

    const deployedAddress = '0x123456789';

    before(() => {

        provider = getDefaultProvider();
        signer = Wallet.createRandom().connect(provider);
    });

    it('constructs', () => {

        const vendor = new EthersVendor(provider, signer);
        const marketPlace = new MarketPlace(vendor);

        assert.instanceOf(marketPlace, MarketPlace);

        assert.strictEqual(marketPlace.vendor, vendor);
    });

    describe('at', () => {

        it('wraps the deployed contract', () => {

            const vendor = new EthersVendor(provider, signer);
            const marketPlace = new MarketPlace(vendor);

            assert.isUndefined(marketPlace.address);

            marketPlace.at(deployedAddress);

            assert.strictEqual(marketPlace.address, deployedAddress);

            // the vendor specific contract wrapper is a proteced property of the market place client
            // to access it during tests, we employ a test helper
            const contract = TEST_HELPERS.marketPlace.ethers.getWrappedContract(marketPlace);

            assert.instanceOf(contract, EthersMarketPlaceContract);
            assert.strictEqual(contract.address, deployedAddress);
        });

        it('has a fluent interface (returns itself)', () => {

            const vendor = new EthersVendor(provider, signer);
            const marketPlace = new MarketPlace(vendor);

            assert.strictEqual(marketPlace.at(deployedAddress), marketPlace);
        });
    });

    describe('admin', () => {

        it('throws if deployed contract is not wrapped', async () => {

            const vendor = new EthersVendor(provider, signer);
            const marketPlace = new MarketPlace(vendor);

            await assertThrows(marketPlace, 'admin');
        });
    });

    describe('swivel', () => {

        it('throws if deployed contract is not wrapped', async () => {

            const vendor = new EthersVendor(provider, signer);
            const marketPlace = new MarketPlace(vendor);

            await assertThrows(marketPlace, 'swivel');
        });
    });

    describe('markets', () => {

        it('throws if deployed contract is not wrapped', async () => {

            const vendor = new EthersVendor(provider, signer);
            const marketPlace = new MarketPlace(vendor);

            await assertThrows(marketPlace, 'markets');
        });

        it('converts arguments and passes them to vendor specific contract instance', async () => {

            const vendor = new EthersVendor(provider, signer);
            const marketPlace = new MarketPlace(vendor).at(deployedAddress);

            // get a stubbable (configurable) clone of the underlying `ethers.Contract`
            const contract = TEST_HELPERS.marketPlace.ethers.stubVendorContract(marketPlace);

            // stub the markets getter of the `ethers.Contract`
            const mock = stub(contract.functions, 'markets');
            const mockResponse: Market = {
                cTokenAddr: '0xcToken',
                zcTokenAddr: '0xzcToken',
                vaultAddr: '0xvault',
            };
            mock.resolves(mockResponse);

            const underlying = '0xunderlying';
            const maturity = 1640987320;
            const response = await marketPlace.markets(underlying, maturity);

            // we should receive the mocked response
            assert.deepStrictEqual(response, mockResponse);
            assert.isTrue(mock.calledOnce);

            // the underlying `ethers.Contract` should be invoked with vendor specific conversions of the arguments
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const [passedUnderlying, passedMaturity] = mock.getCall(0).args;
            const expectedUnderlying = underlying;
            const expectedMaturity = ethers.BigNumber.from(maturity);

            assert.deepStrictEqual(passedUnderlying, expectedUnderlying);
            assert.deepStrictEqual(passedMaturity, expectedMaturity);
        });
    });

    describe('mature', () => {

        it('throws if deployed contract is not wrapped', async () => {

            const vendor = new EthersVendor(provider, signer);
            const marketPlace = new MarketPlace(vendor);

            await assertThrows(marketPlace, 'mature');
        });

        it('converts arguments and passes them to vendor specific contract instance', async () => {

            const vendor = new EthersVendor(provider, signer);
            const marketPlace = new MarketPlace(vendor).at(deployedAddress);

            // get a stubbable (configurable) clone of the underlying `ethers.Contract`
            const contract = TEST_HELPERS.marketPlace.ethers.stubVendorContract(marketPlace);

            // stub the mature function of the `ethers.Contract`
            const mock = stub(contract.functions, 'mature');
            const mockResponse = [true] as Result<[boolean]>;
            mock.resolves(mockResponse);

            const underlying = '0xunderlying';
            const maturity = 1640987320;
            const response = await marketPlace.mature(underlying, maturity);

            // we should receive the unwrapped mocked response
            assert.strictEqual(response, true);
            assert.isTrue(mock.calledOnce);

            // the underlying `ethers.Contract` should be invoked with vendor specific conversions of the arguments
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const [passedUnderlying, passedMaturity] = mock.getCall(0).args;
            const expectedUnderlying = underlying;
            const expectedMaturity = ethers.BigNumber.from(maturity);

            assert.deepStrictEqual(passedUnderlying, expectedUnderlying);
            assert.deepStrictEqual(passedMaturity, expectedMaturity);
        });
    });

    describe('maturityRate', () => {

        it('throws if deployed contract is not wrapped', async () => {

            const vendor = new EthersVendor(provider, signer);
            const marketPlace = new MarketPlace(vendor);

            await assertThrows(marketPlace, 'maturityRate');
        });

        it('converts arguments and passes them to vendor specific contract instance', async () => {

            const vendor = new EthersVendor(provider, signer);
            const marketPlace = new MarketPlace(vendor).at(deployedAddress);

            // get a stubbable (configurable) clone of the underlying `ethers.Contract`
            const contract = TEST_HELPERS.marketPlace.ethers.stubVendorContract(marketPlace);

            // stub the maturityRate function of the `ethers.Contract`
            const mock = stub(contract.functions, 'maturityRate');
            const mockResponse = [ethers.BigNumber.from(0)] as Result<[ethers.BigNumber]>;
            mock.resolves(mockResponse);

            const underlying = '0xunderlying';
            const maturity = 1640987320;
            const response = await marketPlace.maturityRate(underlying, maturity);

            // we should receive the unwrapped mocked response
            assert.strictEqual(response, '0');
            assert.isTrue(mock.calledOnce);

            // the underlying `ethers.Contract` should be invoked with vendor specific conversions of the arguments
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const [passedUnderlying, passedMaturity] = mock.getCall(0).args;
            const expectedUnderlying = underlying;
            const expectedMaturity = ethers.BigNumber.from(maturity);

            assert.deepStrictEqual(passedUnderlying, expectedUnderlying);
            assert.deepStrictEqual(passedMaturity, expectedMaturity);
        });
    });

    describe('matureMarket', () => {

        it('throws if deployed contract is not wrapped', async () => {

            const vendor = new EthersVendor(provider, signer);
            const marketPlace = new MarketPlace(vendor);

            await assertThrows(marketPlace, 'matureMarket');
        });

        it('converts arguments and passes them to vendor specific contract instance', async () => {

            const vendor = new EthersVendor(provider, signer);
            const marketPlace = new MarketPlace(vendor).at(deployedAddress);

            // get a stubbable (configurable) clone of the underlying `ethers.Contract`
            const contract = TEST_HELPERS.marketPlace.ethers.stubVendorContract(marketPlace);

            // stub the matureMarket function of the `ethers.Contract`
            const mock = stub(contract.functions, 'matureMarket');
            const mockResponse: TxResponse = { hash: '0xresponse' };
            mock.resolves(mockResponse);

            const underlying = '0xunderlying';
            const maturity = 1640987320;
            const response = await marketPlace.matureMarket(underlying, maturity);

            // we should receive the mocked response
            assert.deepStrictEqual(response, mockResponse);
            assert.isTrue(mock.calledOnce);

            // the underlying `ethers.Contract` should be invoked with vendor specific conversions of the arguments
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const [passedUnderlying, passedMaturity] = mock.getCall(0).args;
            const expectedUnderlying = underlying;
            const expectedMaturity = ethers.BigNumber.from(maturity);

            assert.deepStrictEqual(passedUnderlying, expectedUnderlying);
            assert.deepStrictEqual(passedMaturity, expectedMaturity);
        });
    });

    describe('transferVaultNotional', () => {

        it('throws if deployed contract is not wrapped', async () => {

            const vendor = new EthersVendor(provider, signer);
            const marketPlace = new MarketPlace(vendor);

            await assertThrows(marketPlace, 'transferVaultNotional');
        });

        it('converts arguments and passes them to vendor specific contract instance', async () => {

            const vendor = new EthersVendor(provider, signer);
            const marketPlace = new MarketPlace(vendor).at(deployedAddress);

            // get a stubbable (configurable) clone of the underlying `ethers.Contract`
            const contract = TEST_HELPERS.marketPlace.ethers.stubVendorContract(marketPlace);

            // stub the transferVaultNotional function of the `ethers.Contract`
            const mock = stub(contract.functions, 'transferVaultNotional');
            const mockResponse: TxResponse = { hash: '0xresponse' };
            mock.resolves(mockResponse);

            const underlying = '0xunderlying';
            const maturity = 1640987320;
            const target = '0xtarget';
            const amount = '1000';
            const response = await marketPlace.transferVaultNotional(underlying, maturity, target, amount);

            // we should receive the mocked response
            assert.deepStrictEqual(response, mockResponse);
            assert.isTrue(mock.calledOnce);

            // the underlying `ethers.Contract` should be invoked with vendor specific conversions of the arguments
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const [passedUnderlying, passedMaturity, passedTarget, passedAmount] = mock.getCall(0).args;
            const expectedUnderlying = underlying;
            const expectedMaturity = ethers.BigNumber.from(maturity);
            const expectedTarget = target;
            const expectedAmount = ethers.BigNumber.from(amount);

            assert.deepStrictEqual(passedUnderlying, expectedUnderlying);
            assert.deepStrictEqual(passedMaturity, expectedMaturity);
            assert.deepStrictEqual(passedTarget, expectedTarget);
            assert.deepStrictEqual(passedAmount, expectedAmount);
        });
    });
});
