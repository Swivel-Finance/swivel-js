import { Signer } from '@ethersproject/abstract-signer';
import { getDefaultProvider, Provider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { assert } from 'chai';
import { ethers } from 'ethers';
import { stub } from 'sinon';
import { Order, Swivel, TxResponse } from '../src';
import { CHAIN_ID_AND_VERIFYING_CONTRACT_REQUIRED, MISSING_CONTRACT_ADDRESS } from '../src/errors';
import { EthersSwivelContract, EthersVendor, prepareOrder, Result, splitSignature, toBigNumber } from '../src/vendors/ethers';
import { TEST_HELPERS } from './test-helpers';

const assertThrows = async (swivel: Swivel, method: keyof Swivel, ...args: unknown[]) => {

    let error: string | undefined;
    let response: unknown;

    try {

        response = await (swivel[method] as (...args: unknown[]) => Promise<unknown>)(...args);

    } catch (e) {

        error = e as string;
    }

    assert.notOk(response);
    assert.strictEqual(error, MISSING_CONTRACT_ADDRESS('swivel'));
};

describe('Swivel', () => {

    let provider: Provider;
    let signer: Signer;

    const chainId = 42;
    const verifyingContract = '0xdd644f221Eec4Fbe1B89C74bC7b276A0a2b8818f';
    const deployedAddress = '0x123456789';

    const order: Order = {
        key: '0xfb1700b125bdb80a6c11c181325a5a744fe00a098f379aa31fcbcdfb1d6d1c01',
        maker: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        underlying: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        vault: false,
        exit: false,
        principal: '1000',
        premium: '50',
        maturity: '12345',
        expiry: '123456789',
    };

    before(() => {

        provider = getDefaultProvider();
        signer = Wallet.createRandom().connect(provider);
    });

    it('constructs', () => {

        const vendor = new EthersVendor(provider, signer);
        const swivel = new Swivel(vendor, chainId, verifyingContract);

        assert.instanceOf(swivel, Swivel);

        assert.equal(swivel.vendor, vendor);
        assert.equal(swivel.chainId, chainId);
        assert.equal(swivel.verifyingContract, verifyingContract);
    });

    describe('at', () => {

        it('wraps the deployed contract', () => {

            const vendor = new EthersVendor(provider, signer);
            const swivel = new Swivel(vendor, chainId, verifyingContract);

            assert.isUndefined(swivel.address);

            swivel.at(deployedAddress);

            assert.equal(swivel.address, deployedAddress);

            // the vendor specific contract wrapper is a proteced property of the swivel client
            // to access it during tests, we employ a test helper
            const contract = TEST_HELPERS.swivel.ethers.getWrappedContract(swivel);

            assert.instanceOf(contract, EthersSwivelContract);
            assert.equal(contract.address, deployedAddress);
        });

        it('has a fluent interface (returns itself)', () => {

            const vendor = new EthersVendor(provider, signer);
            const swivel = new Swivel(vendor, chainId, verifyingContract);

            assert.equal(swivel.at(deployedAddress), swivel);
        });
    });

    describe('signOrder', () => {

        it('throws if chain-id or verifying contract is not set', async () => {

            const vendor = new EthersVendor(provider, signer);
            const swivel = new Swivel(vendor);

            let signature: string | undefined;
            let error: string | undefined;

            try {

                signature = await swivel.signOrder(order);

            } catch (e) {

                error = e as string;
            }

            assert.notOk(signature);
            assert.equal(error, CHAIN_ID_AND_VERIFYING_CONTRACT_REQUIRED);
        });

        it('signs orders', async () => {

            const vendor = new EthersVendor(provider, signer);
            const swivel = new Swivel(vendor, chainId, verifyingContract);

            const signature = await swivel.signOrder(order);

            assert.isTrue(typeof signature === 'string');
            assert.isNotEmpty(signature);
        });
    });

    describe('NAME', () => {

        it('throws if deployed contract is not wrapped', async () => {

            const vendor = new EthersVendor(provider, signer);
            const swivel = new Swivel(vendor, chainId, verifyingContract);

            await assertThrows(swivel, 'NAME');
        });

        it('unwraps the contract `Result`', async () => {

            const vendor = new EthersVendor(provider, signer);
            const swivel = new Swivel(vendor, chainId, verifyingContract).at(deployedAddress);

            // get a stubbable (configurable) clone of the underlying `ethers.Contract`
            const contract = TEST_HELPERS.swivel.ethers.stubVendorContract(swivel);

            // stub the NAME getter of the `ethers.Contract`
            const mock = stub(contract.functions, 'NAME');
            const mockResponse = ['Swivel Finance'] as Result<[string]>;
            mock.resolves(mockResponse);

            const response = await swivel.NAME();

            assert.strictEqual(response, 'Swivel Finance');
        });
    });

    describe('VERSION', () => {

        it('throws if deployed contract is not wrapped', async () => {

            const vendor = new EthersVendor(provider, signer);
            const swivel = new Swivel(vendor, chainId, verifyingContract);

            await assertThrows(swivel, 'VERSION');
        });

        it('unwraps the contract `Result`', async () => {

            const vendor = new EthersVendor(provider, signer);
            const swivel = new Swivel(vendor, chainId, verifyingContract).at(deployedAddress);

            // get a stubbable (configurable) clone of the underlying `ethers.Contract`
            const contract = TEST_HELPERS.swivel.ethers.stubVendorContract(swivel);

            // stub the VERSION getter of the `ethers.Contract`
            const mock = stub(contract.functions, 'VERSION');
            const mockResponse = ['2.0.0'] as Result<[string]>;
            mock.resolves(mockResponse);

            const response = await swivel.VERSION();

            assert.strictEqual(response, '2.0.0');
        });
    });

    describe('domain', () => {

        it('throws if deployed contract is not wrapped', async () => {

            const vendor = new EthersVendor(provider, signer);
            const swivel = new Swivel(vendor, chainId, verifyingContract);

            await assertThrows(swivel, 'domain');
        });

        it('unwraps the contract `Result`', async () => {

            const vendor = new EthersVendor(provider, signer);
            const swivel = new Swivel(vendor, chainId, verifyingContract).at(deployedAddress);

            // get a stubbable (configurable) clone of the underlying `ethers.Contract`
            const contract = TEST_HELPERS.swivel.ethers.stubVendorContract(swivel);

            // stub the domain getter of the `ethers.Contract`
            const mock = stub(contract.functions, 'domain');
            const mockResponse = ['0xff994c6dc7681610e2df3e5851876850c586a3d189b9c6924c06dd497726a16c'] as Result<[string]>;
            mock.resolves(mockResponse);

            const response = await swivel.domain();

            assert.strictEqual(response, '0xff994c6dc7681610e2df3e5851876850c586a3d189b9c6924c06dd497726a16c');
        });
    });

    describe('marketPlace', () => {

        it('throws if deployed contract is not wrapped', async () => {

            const vendor = new EthersVendor(provider, signer);
            const swivel = new Swivel(vendor, chainId, verifyingContract);

            await assertThrows(swivel, 'marketPlace');
        });

        it('unwraps the contract `Result`', async () => {

            const vendor = new EthersVendor(provider, signer);
            const swivel = new Swivel(vendor, chainId, verifyingContract).at(deployedAddress);

            // get a stubbable (configurable) clone of the underlying `ethers.Contract`
            const contract = TEST_HELPERS.swivel.ethers.stubVendorContract(swivel);

            // stub the marketPlace getter of the `ethers.Contract`
            const mock = stub(contract.functions, 'marketPlace');
            const mockResponse = ['0xmarketplaceAddress'] as Result<[string]>;
            mock.resolves(mockResponse);

            const response = await swivel.marketPlace();

            assert.strictEqual(response, '0xmarketplaceAddress');
        });
    });

    describe('cancelled', () => {

        it('throws if deployed contract is not wrapped', async () => {

            const vendor = new EthersVendor(provider, signer);
            const swivel = new Swivel(vendor, chainId, verifyingContract);

            await assertThrows(swivel, 'cancelled');
        });

        it('unwraps the contract `Result`', async () => {

            const vendor = new EthersVendor(provider, signer);
            const swivel = new Swivel(vendor, chainId, verifyingContract).at(deployedAddress);
            const orderKey = '0xfb1700b125bdb80a6c11c181325a5a744fe00a098f379aa31fcbcdfb1d6d1c01';

            // get a stubbable (configurable) clone of the underlying `ethers.Contract`
            const contract = TEST_HELPERS.swivel.ethers.stubVendorContract(swivel);

            // stub the cancelled getter of the `ethers.Contract`
            const mock = stub(contract.functions, 'cancelled');
            const mockResponse = [true] as Result<[boolean]>;
            mock.resolves(mockResponse);

            const response = await swivel.cancelled(orderKey);

            assert.strictEqual(response, true);
        });
    });

    describe('filled', () => {

        it('throws if deployed contract is not wrapped', async () => {

            const vendor = new EthersVendor(provider, signer);
            const swivel = new Swivel(vendor, chainId, verifyingContract);

            await assertThrows(swivel, 'filled');
        });

        it('unwraps the contract `Result`', async () => {

            const vendor = new EthersVendor(provider, signer);
            const swivel = new Swivel(vendor, chainId, verifyingContract).at(deployedAddress);
            const orderKey = '0xfb1700b125bdb80a6c11c181325a5a744fe00a098f379aa31fcbcdfb1d6d1c01';

            // get a stubbable (configurable) clone of the underlying `ethers.Contract`
            const contract = TEST_HELPERS.swivel.ethers.stubVendorContract(swivel);

            // stub the filled getter of the `ethers.Contract`
            const mock = stub(contract.functions, 'filled');
            // `filled` returns a `BigNumber`
            const mockResponse = [ethers.BigNumber.from(1000)] as Result<[ethers.BigNumber]>;
            mock.resolves(mockResponse);

            const response = await swivel.filled(orderKey);

            assert.strictEqual(response, '1000');
        });
    });

    describe('cancel', () => {

        it('throws if deployed contract is not wrapped', async () => {

            const vendor = new EthersVendor(provider, signer);
            const swivel = new Swivel(vendor, chainId, verifyingContract);

            await assertThrows(swivel, 'cancel');
        });

        it('converts arguments and passes them to vendor specific contract instance', async () => {

            const vendor = new EthersVendor(provider, signer);
            const swivel = new Swivel(vendor, chainId, verifyingContract).at(deployedAddress);

            // get a stubbable (configurable) clone of the underlying `ethers.Contract`
            const contract = TEST_HELPERS.swivel.ethers.stubVendorContract(swivel);

            // stub the cancel function of the `ethers.Contract`
            const mock = stub(contract.functions, 'cancel');
            const mockResponse: TxResponse = { hash: '0xresponse' };
            mock.resolves(mockResponse);

            const signature = await swivel.signOrder(order);
            const response = await swivel.cancel(order, signature);

            // we should receive the mocked response
            assert.equal(response, mockResponse);
            assert.isTrue(mock.calledOnce);

            /**
             * the underlying `ethers.Contract` should be invoked with vendor specific
             * conversions of the arguments, e.g.:
             * - `Order` -> `EthersOrder`
             * - `string` -> `Signature`
             */

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const [passedOrder, passedSignature] = mock.getCall(0).args;
            const expectedOrder = prepareOrder(order);
            const expectedSignature = splitSignature(signature);

            assert.deepEqual(passedOrder, expectedOrder);
            assert.deepEqual(passedSignature, expectedSignature);
        });
    });

    describe('initiate', () => {

        it('throws if deployed contract is not wrapped', async () => {

            const vendor = new EthersVendor(provider, signer);
            const swivel = new Swivel(vendor, chainId, verifyingContract);

            await assertThrows(swivel, 'initiate');
        });

        it('converts arguments and passes them to vendor specific contract instance', async () => {

            const vendor = new EthersVendor(provider, signer);
            const swivel = new Swivel(vendor, chainId, verifyingContract).at(deployedAddress);

            // get a stubbable (configurable) clone of the underlying `ethers.Contract`
            const contract = TEST_HELPERS.swivel.ethers.stubVendorContract(swivel);

            // stub the cancel function of the `ethers.Contract`
            const mock = stub(contract.functions, 'initiate');
            const mockResponse: TxResponse = { hash: '0xresponse' };
            mock.resolves(mockResponse);

            const signature = await swivel.signOrder(order);
            const response = await swivel.initiate([order], [1000], [signature]);

            // we should receive the mocked response
            assert.equal(response, mockResponse);
            assert.isTrue(mock.calledOnce);

            /**
             * the underlying `ethers.Contract` should be invoked with vendor specific
             * conversions of the arguments, e.g.:
             * - `Order` -> `EthersOrder`
             * - `number` -> `BigNumber`
             * - `string` -> `Signature`
             */

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const [passedOrders, passedAmounts, passedSignatures] = mock.getCall(0).args;
            const expectedOrders = [prepareOrder(order)];
            const expectedAmounts = [toBigNumber(1000)];
            const expectedSignatures = [splitSignature(signature)];

            assert.deepEqual(passedOrders, expectedOrders);
            assert.deepEqual(passedAmounts, expectedAmounts);
            assert.deepEqual(passedSignatures, expectedSignatures);
        });
    });

    describe('exit', () => {

        it('throws if deployed contract is not wrapped', async () => {

            const vendor = new EthersVendor(provider, signer);
            const swivel = new Swivel(vendor, chainId, verifyingContract);

            await assertThrows(swivel, 'exit');
        });

        it('converts arguments and passes them to vendor specific contract instance', async () => {

            const vendor = new EthersVendor(provider, signer);
            const swivel = new Swivel(vendor, chainId, verifyingContract).at(deployedAddress);

            // get a stubbable (configurable) clone of the underlying `ethers.Contract`
            const contract = TEST_HELPERS.swivel.ethers.stubVendorContract(swivel);

            // stub the cancel function of the `ethers.Contract`
            const mock = stub(contract.functions, 'exit');
            const mockResponse: TxResponse = { hash: '0xresponse' };
            mock.resolves(mockResponse);

            const signature = await swivel.signOrder(order);
            const response = await swivel.exit([order], [1000], [signature]);

            // we should receive the mocked response
            assert.equal(response, mockResponse);
            assert.isTrue(mock.calledOnce);

            /**
             * the underlying `ethers.Contract` should be invoked with vendor specific
             * conversions of the arguments, e.g.:
             * - `Order` -> `EthersOrder`
             * - `number` -> `BigNumber`
             * - `string` -> `Signature`
             */

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const [passedOrders, passedAmounts, passedSignatures] = mock.getCall(0).args;
            const expectedOrders = [prepareOrder(order)];
            const expectedAmounts = [toBigNumber(1000)];
            const expectedSignatures = [splitSignature(signature)];

            assert.deepEqual(passedOrders, expectedOrders);
            assert.deepEqual(passedAmounts, expectedAmounts);
            assert.deepEqual(passedSignatures, expectedSignatures);
        });
    });

    describe('splitUnderlying', () => {

        it('throws if deployed contract is not wrapped', async () => {

            const vendor = new EthersVendor(provider, signer);
            const swivel = new Swivel(vendor, chainId, verifyingContract);

            await assertThrows(swivel, 'splitUnderlying');
        });

        it('converts arguments and passes them to vendor specific contract instance', async () => {

            const vendor = new EthersVendor(provider, signer);
            const swivel = new Swivel(vendor, chainId, verifyingContract).at(deployedAddress);

            // get a stubbable (configurable) clone of the underlying `ethers.Contract`
            const contract = TEST_HELPERS.swivel.ethers.stubVendorContract(swivel);

            // stub the splitUnderlying function of the `ethers.Contract`
            const mock = stub(contract.functions, 'splitUnderlying');
            const mockResponse: TxResponse = { hash: '0xresponse' };
            mock.resolves(mockResponse);

            const underlying = '0x1234';
            const maturity = '12345';
            const amount = '1000000000000000000';

            const response = await swivel.splitUnderlying(underlying, maturity, amount);

            // we should receive the mocked response
            assert.equal(response, mockResponse);
            assert.isTrue(mock.calledOnce);

            /**
             * The underlying `ethers.Contract` should be invoked with vendor specific conversions of the arguments
             */

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const [passedAddress, passedMaturity, passedAmount] = mock.getCall(0).args;
            const expectedUnderlying = underlying;
            const expectedMaturity = toBigNumber(maturity);
            const expectedAmount = toBigNumber(amount);

            assert.deepEqual(passedAddress, expectedUnderlying);
            assert.deepEqual(passedMaturity, expectedMaturity);
            assert.deepEqual(passedAmount, expectedAmount);
        });
    });

    describe('combineTokens', () => {

        it('throws if deployed contract is not wrapped', async () => {

            const vendor = new EthersVendor(provider, signer);
            const swivel = new Swivel(vendor, chainId, verifyingContract);

            await assertThrows(swivel, 'combineTokens');
        });

        it('converts arguments and passes them to vendor specific contract instance', async () => {

            const vendor = new EthersVendor(provider, signer);
            const swivel = new Swivel(vendor, chainId, verifyingContract).at(deployedAddress);

            // get a stubbable (configurable) clone of the underlying `ethers.Contract`
            const contract = TEST_HELPERS.swivel.ethers.stubVendorContract(swivel);

            // stub the combineTokens function of the `ethers.Contract`
            const mock = stub(contract.functions, 'combineTokens');
            const mockResponse: TxResponse = { hash: '0xresponse' };
            mock.resolves(mockResponse);

            const underlying = '0x1234';
            const maturity = '12345';
            const amount = '1000000000000000000';

            const response = await swivel.combineTokens(underlying, maturity, amount);

            // we should receive the mocked response
            assert.equal(response, mockResponse);
            assert.isTrue(mock.calledOnce);

            /**
             * The underlying `ethers.Contract` should be invoked with vendor specific conversions of the arguments
             */

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const [passedAddress, passedMaturity, passedAmount] = mock.getCall(0).args;
            const expectedUnderlying = underlying;
            const expectedMaturity = toBigNumber(maturity);
            const expectedAmount = toBigNumber(amount);

            assert.deepEqual(passedAddress, expectedUnderlying);
            assert.deepEqual(passedMaturity, expectedMaturity);
            assert.deepEqual(passedAmount, expectedAmount);
        });
    });

    describe('redeemZcToken', () => {

        it('throws if deployed contract is not wrapped', async () => {

            const vendor = new EthersVendor(provider, signer);
            const swivel = new Swivel(vendor);

            await assertThrows(swivel, 'redeemZcToken');
        });

        it('converts arguments and passes them to vendor specific contract instance', async () => {

            const vendor = new EthersVendor(provider, signer);
            const swivel = new Swivel(vendor).at(deployedAddress);

            // get a stubbable (configurable) clone of the underlying `ethers.Contract`
            const contract = TEST_HELPERS.swivel.ethers.stubVendorContract(swivel);

            // stub the redeemZcToken function of the `ethers.Contract`
            const mock = stub(contract.functions, 'redeemZcToken');
            const mockResponse: TxResponse = { hash: '0xresponse' };
            mock.resolves(mockResponse);

            const underlying = '0xunderlying';
            const maturity = 1640987320;
            const amount = '1000';
            const response = await swivel.redeemZcToken(underlying, maturity, amount);

            // we should receive the mocked response
            assert.deepStrictEqual(response, mockResponse);
            assert.isTrue(mock.calledOnce);

            // the underlying `ethers.Contract` should be invoked with vendor specific conversions of the arguments
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const [passedUnderlying, passedMaturity, passedAmount] = mock.getCall(0).args;
            const expectedUnderlying = underlying;
            const expectedMaturity = ethers.BigNumber.from(maturity);
            const expectedAmount = ethers.BigNumber.from(amount);

            assert.deepStrictEqual(passedUnderlying, expectedUnderlying);
            assert.deepStrictEqual(passedMaturity, expectedMaturity);
            assert.deepStrictEqual(passedAmount, expectedAmount);
        });
    });

    describe('redeemVaultInterest', () => {

        it('throws if deployed contract is not wrapped', async () => {

            const vendor = new EthersVendor(provider, signer);
            const swivel = new Swivel(vendor);

            await assertThrows(swivel, 'redeemVaultInterest');
        });

        it('converts arguments and passes them to vendor specific contract instance', async () => {

            const vendor = new EthersVendor(provider, signer);
            const swivel = new Swivel(vendor).at(deployedAddress);

            // get a stubbable (configurable) clone of the underlying `ethers.Contract`
            const contract = TEST_HELPERS.swivel.ethers.stubVendorContract(swivel);

            // stub the redeemVaultInterest function of the `ethers.Contract`
            const mock = stub(contract.functions, 'redeemVaultInterest');
            const mockResponse: TxResponse = { hash: '0xresponse' };
            mock.resolves(mockResponse);

            const underlying = '0xunderlying';
            const maturity = 1640987320;
            const response = await swivel.redeemVaultInterest(underlying, maturity);

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
});
