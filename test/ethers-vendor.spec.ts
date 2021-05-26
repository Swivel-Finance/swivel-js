import { Signer } from '@ethersproject/abstract-signer';
import { getDefaultProvider, Provider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { assert } from 'chai';
import { BigNumber, ethers, utils } from 'ethers';
import { DOMAIN_NAME, DOMAIN_VERSION } from '../src/constants';
import { Components, Contract } from '../src/interfaces';
import Vendor from '../src/vendors/ethers';
import { ValidOrder } from '../src/vendors/interfaces/order';

describe('Ethers Provider abstraction', () => {
    let vendor: Vendor;

    let signer: Signer;
    let provider: Provider;
    const order: any = {
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
        vendor = new Vendor(provider, signer);
    });

    it('constructs', () => {
        assert.equal(vendor.provider, provider);
        assert.equal(vendor.signer, signer);
    });

    it('returns a low level contract', () => {
        const abi = ['function balanceOf(address owner) view returns (uint256)'];
        const contract: Contract = vendor.contract('0x123', abi);
        assert.isNotNull(contract);
        assert.equal(contract.address, '0x123');
    });

    it('returns a domain', async () => {
        const domain = vendor.domain(42, '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccD');
        assert.isNotNull(domain);
        assert.deepEqual(domain.name, DOMAIN_NAME);
        assert.deepEqual(domain.version, DOMAIN_VERSION);
        assert.deepEqual(domain.chainId, 42);
        assert.deepEqual(domain.verifyingContract, '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccD');
    });

    it('returns a ether specific order', () => {
        const validOrder: ValidOrder = vendor.prepareOrder(order);
        assert.isNotNull(validOrder);
        assert.deepEqual(validOrder.key, utils.arrayify(order.key));
        assert.equal(validOrder.maker, order.maker);
        assert.equal(validOrder.underlying, order.underlying);
        assert.equal(validOrder.vault, order.vault);
        assert.deepEqual(validOrder.principal, ethers.BigNumber.from(order.principal));
        assert.deepEqual(validOrder.premium, ethers.BigNumber.from(order.premium));
        assert.deepEqual(validOrder.maturity, ethers.BigNumber.from(order.maturity));
        assert.deepEqual(validOrder.expiry, ethers.BigNumber.from(order.expiry));
    });

    it('returns a valid signature', async () => {
        const signature: string = await vendor.signOrder(order, 42, '0xdd644f221Eec4Fbe1B89C74bC7b276A0a2b8818f');
        assert.isNotNull(signature);
    });

    it('returns a splited sig', async () => {
        const signature: string = await vendor.signOrder(order, 42, '0xdd644f221Eec4Fbe1B89C74bC7b276A0a2b8818f');
        const components: Components = vendor.splitSignature(signature);
        assert.isNotNull(components);
        assert.isFalse(components.v < 27);
    });

    it('returns a bignumber', async () => {
        const filling = vendor.prepareFillingAmount('42');
        assert.isNotNull(filling);
        assert.deepEqual(filling, BigNumber.from('42'));
    });
});