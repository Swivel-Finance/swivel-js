import { assert } from 'chai';
import { domain, DOMAIN_NAME, DOMAIN_VERSION, TypedDataDomain } from '../../src';

describe('constants/domain', () => {

    it('returns the correct domain data for EIP-712 signing', () => {

        const chainId = 42;
        const verifyingContract = '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccD';

        const expected: TypedDataDomain = {
            name: DOMAIN_NAME,
            version: DOMAIN_VERSION,
            chainId,
            verifyingContract,
        };

        assert.deepEqual(domain(chainId, verifyingContract), expected);
    });
});
