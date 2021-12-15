import { assert } from 'chai';
import { ethers } from 'ethers';
import { gasLimit } from '../../../../src/vendors/ethers';

describe('vendors/ethers/utils/gas-limit', () => {

    it('calculates a correct gas limit', () => {

        const estimated = ethers.BigNumber.from('300000');
        const limit = gasLimit(estimated);

        assert.strictEqual(limit._isBigNumber, true, 'should create a BigNumber instance');
        assert.strictEqual(limit.gt(estimated), true, 'the limit should be greater than the estimate');
        assert.isAtLeast(limit.toNumber(), estimated.toNumber() * 1.05, 'the limit should be at least 5% greater than the estimate');
    });
});
