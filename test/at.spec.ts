import { getDefaultProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { assert } from 'chai';
import Swivel from '../src/swivel';
import Vendor from '../src/vendors/ethers';

describe('Swivel at method', () => {
    let swivel: Swivel;

    before(() => {
        const ethersProvider = getDefaultProvider();
        const signer = Wallet.createRandom().connect(ethersProvider);
        const vendor: Vendor = new Vendor(ethersProvider, signer);
        swivel = new Swivel(vendor);
    });

    it('Wraps a deployed contract', () => {
        const wrapped = swivel.at('0x123');
        assert.isTrue(wrapped);
        assert.isNotNull(swivel.contract);
        assert.equal(swivel.contract?.address, '0x123');
    });
});
