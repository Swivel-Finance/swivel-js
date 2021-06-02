import { ethers } from 'ethers';

/**
 * Converts an amount into an `ethers.js` specific amount.
 *
 * @param a - amount
 */
export function prepareAmount (a: number | string): ethers.BigNumber {

    return ethers.BigNumber.from(a);
}
