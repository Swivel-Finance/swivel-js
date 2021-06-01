import { Signer } from '@ethersproject/abstract-signer';
import { getDefaultProvider, Provider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { assert } from 'chai';
import { stub } from 'sinon';
import { EthersSwivelContract, EthersVendor, Order, prepareOrder, splitSignature, Swivel, TxResponse } from '../../src/@new';
import { CHAIN_ID_AND_VERIFYING_CONTRACT_REQUIRED, MISSING_CONTRACT_ADDRESS } from '../../src/@new/errors';
import { TEST_HELPERS } from './test-helpers';

describe('swivel', () => {

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

    describe('cancel', () => {

        it('throws if deployed contract is not wrapped', async () => {

            const vendor = new EthersVendor(provider, signer);
            const swivel = new Swivel(vendor, chainId, verifyingContract);

            let signature: string | undefined;
            let error: string | undefined;
            let response: TxResponse | undefined;

            try {

                signature = await swivel.signOrder(order);
                response = await swivel.cancel(order, signature);

            } catch (e) {

                error = e as string;
            }

            assert.isTrue(typeof signature === 'string');
            assert.isNotEmpty(signature);

            assert.notOk(response);

            assert.equal(error, MISSING_CONTRACT_ADDRESS('swivel'));
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

        // TODO: implement tests
    });

    describe('exit', () => {

        // TODO: implement tests
    });
});
