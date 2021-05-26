import { getDefaultProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { assert } from 'chai';
import { stub } from 'sinon';
import { Order } from '../src/interfaces';
import Swivel from '../src/swivel';
import Vendor from '../src/vendors/ethers';

describe('Swivel signOrder method', () => {
    let swivel: Swivel;
    let vendor: Vendor;

    before(() => {
        const ethersProvider = getDefaultProvider();
        const signer = Wallet.createRandom().connect(ethersProvider);
        vendor = new Vendor(ethersProvider, signer);
        swivel = new Swivel(vendor, 42, '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccD');
    });

    it('passes the call thru to the vendor signOrder', async () => {
        // allow stubbing contract properties
        // swivel.contract = cloneWithWriteAccess(swivel.contract)

        const fake = stub(vendor, 'signOrder');
        fake.resolves('0x64eac4af28');

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

        const result: string = await swivel.signOrder(order);
        assert(fake.calledOnce);
        assert.isNotNull(result);
        assert.equal(result, '0x64eac4af28');

        const { args } = fake.getCall(0);
        assert.deepEqual(args[0], order);
        assert.deepEqual(args[1], 42);
        assert.equal(args[2], '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccD');
    });
});
