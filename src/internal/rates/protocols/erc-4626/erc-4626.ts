import { Provider } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { Contract } from 'ethers';
import { BASE } from '../../helpers/index.js';
import { ERC_4626_ABI } from './constants.js';
import { ERC4626Contract } from './types.js';

/**
 * ERC-4626 exchangeRate implementation.
 *
 * @remarks
 * https://eips.ethereum.org/EIPS/eip-4626
 *
 * @internal
 */
export async function exchangeRateERC4626 (a: string, s: Provider | Signer): Promise<string | undefined> {

    const contract = new Contract(a, ERC_4626_ABI, s) as ERC4626Contract;

    return (await contract.convertToAssets(BASE)).toString();
}

/**
 * ERC-4626 interestRate implementation.
 *
 * @remarks
 * There is no standardized way for ERC-4626 tokens to obtain a supply APY.
 *
 * @internal
 */
export function interestRateERC4626 (): undefined {

    return undefined;
}
