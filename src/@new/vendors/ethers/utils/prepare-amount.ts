import { BigNumber, ethers } from 'ethers';

/**
 * Converts an amount into an `ethers.js` specific amount.
 *
 * @param a - amount
 */
export function prepareAmount (a: number | string): BigNumber {

    return ethers.BigNumber.from(a);
}
