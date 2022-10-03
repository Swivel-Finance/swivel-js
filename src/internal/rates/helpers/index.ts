import { Provider } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { BigNumberish, FixedNumber } from '@ethersproject/bignumber';
import { BASE_DECIMALS } from './constants.js';

export * from './constants.js';

/**
 * Helper method to get the current chain id from a Provider or Signer.
 */
export const getChain = async (s: Provider | Signer): Promise<number> => {

    return (s as Signer)._isSigner
        ? await (s as Signer).getChainId()
        : (await (s as Provider).getNetwork()).chainId;
};

/**
 * Create a FixedNumber.
 *
 * @param v - value
 * @param d - precision (number of decimals)
 */
export const fixed = (v: BigNumberish, d = BASE_DECIMALS): FixedNumber => {

    return FixedNumber.from(v, d);
};

/**
 * Stringify a number ensuring no exponential notations.
 *
 * @remarks
 * Trailing zeros are removed from the result.
 *
 * @param v - number
 * @param d - precision (number of decimals)
 */
export const stringify = (v: number, d = BASE_DECIMALS): string => {

    return v.toFixed(d).replace(/(?<!\.)0+$/, '');
};
