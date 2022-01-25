import { assert } from 'chai';
import { ethers } from 'ethers';
import { gasLimit } from '../../../../src/vendors/ethers/index.js';

describe('vendors/ethers/utils/gas-limit', () => {

    it('calculates a correct gas limit', () => {

        const estimated = ethers.BigNumber.from('400000');
        const limit = gasLimit(estimated);

        assert.strictEqual(limit._isBigNumber, true, 'should create a BigNumber instance');
        assert.strictEqual(limit.gt(estimated), true, 'the limit should be greater than the estimate');
        assert.strictEqual(limit.toNumber(), estimated.toNumber() + 26000, 'the limit should be 26k greater than the estimate');
    });
});
