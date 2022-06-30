import { TypedDataDomain } from '@ethersproject/abstract-signer';
import { DOMAIN_NAME, DOMAIN_VERSION } from '../constants/eip-712.js';

/**
 * Get the domain data for EIP-712 signing.
 *
 * @param i - chain id
 * @param c - verifying contract
 */
export const domain = (i: number, c: string): TypedDataDomain => ({
    name: DOMAIN_NAME,
    version: DOMAIN_VERSION,
    chainId: i,
    verifyingContract: c,
});
