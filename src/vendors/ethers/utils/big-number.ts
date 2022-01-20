import { ethers } from 'ethers';
import { uint256 } from '../../../interfaces/index.js';

/**
 * Converts a {@link uint256} to an {@link ethers.BigNumber}.
 *
 * @param a - amount
 */
export function toBigNumber (a: uint256): ethers.BigNumber {

    return ethers.BigNumber.from(a);
}

/**
 * Converts an {@link ethers.BigNumber} to a string
 *
 * @param n - the `ethers.BigNumber` to convert
 */
export function fromBigNumber (n: ethers.BigNumber): string {

    return n.toString();
}
