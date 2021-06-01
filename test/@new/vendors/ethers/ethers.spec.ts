import { Signer } from '@ethersproject/abstract-signer';
import { getDefaultProvider, Provider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { assert } from 'chai';
import { BigNumber, ethers, utils } from 'ethers';
import { EthersMarketplaceContract, EthersSwivelContract, EthersVendor, MARKETPLACE_ABI, Order, prepareAmount, prepareOrder, splitSignature, SWIVEL_ABI } from '../../../../src/@new';

describe('vendors/ethers', () => {

    let provider: Provider;
    let signer: Signer;

    const chainId = 42;
    const verifyingContract = '0xdd644f221Eec4Fbe1B89C74bC7b276A0a2b8818f';

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

    it('constructs a vendor', () => {

        const vendor = new EthersVendor(provider, signer);

        assert.instanceOf(vendor, EthersVendor);
        assert.equal(vendor.provider, provider);
        assert.equal(vendor.signer, signer);
    });

    it('creates low-level swivel contract', () => {

        const vendor = new EthersVendor(provider, signer);
        const address = '0x123';
        const contract = vendor.contracts.swivel(address, SWIVEL_ABI);

        assert.instanceOf(contract, EthersSwivelContract);
        assert.equal(contract.address, address);
    });

    it('creates low-level marketplace contract', () => {

        const vendor = new EthersVendor(provider, signer);
        const address = '0x123';
        const contract = vendor.contracts.marketplace(address, MARKETPLACE_ABI);

        assert.instanceOf(contract, EthersMarketplaceContract);
        assert.equal(contract.address, address);
    });

    it('signs orders', async () => {

        const vendor = new EthersVendor(provider, signer);
        const signature = await vendor.signOrder(order, chainId, verifyingContract);

        assert.isTrue(typeof signature === 'string');
        assert.isNotEmpty(signature);
    });

    describe('utils', () => {

        // TODO: Does this test even make sense? It literally re-implements the prepareAmount function.
        it('prepares an amount', () => {

            const amountString = '37';
            const amountNumber = 37;

            let preparedAmount = prepareAmount(amountString);

            assert.instanceOf(preparedAmount, BigNumber);
            assert.deepEqual(preparedAmount, BigNumber.from(amountString));

            preparedAmount = prepareAmount(amountNumber);

            assert.instanceOf(preparedAmount, BigNumber);
            assert.deepEqual(preparedAmount, BigNumber.from(amountNumber));
        });

        // TODO: Does this test even make sense? It literally re-implements the prepareOrder function.
        it('prepares an order', () => {

            const preparedOrder = prepareOrder(order);

            assert.isOk(preparedOrder);
            assert.deepEqual(preparedOrder.key, utils.arrayify(order.key));
            assert.equal(preparedOrder.maker, order.maker);
            assert.equal(preparedOrder.underlying, order.underlying);
            assert.equal(preparedOrder.vault, order.vault);
            assert.deepEqual(preparedOrder.principal, ethers.BigNumber.from(order.principal));
            assert.deepEqual(preparedOrder.premium, ethers.BigNumber.from(order.premium));
            assert.deepEqual(preparedOrder.maturity, ethers.BigNumber.from(order.maturity));
            assert.deepEqual(preparedOrder.expiry, ethers.BigNumber.from(order.expiry));
        });

        it('splits a signature', async () => {

            const vendor = new EthersVendor(provider, signer);
            const signature = await vendor.signOrder(order, chainId, verifyingContract);
            const components = splitSignature(signature);

            assert.isOk(signature);

            assert.equal(components.r, `0x${ signature.substr(2, 64) }`);
            assert.equal(components.s, `0x${ signature.substr(66, 64) }`);
            assert.isTrue(components.v >= 27);
        });
    });
});
