import { Provider } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { Contract } from 'ethers';
import { fetch, request, response } from '../../../fetch/index.js';
import { stringify } from '../../helpers/index.js';
import { LIDO_API, WSTETH_ABI } from './constants.js';
import { LidoApiSchema, wstETHContract } from './types.js';

/**
 * Lido's exchangeRate implementation.
 *
 * @remarks
 * https://docs.lido.fi/contracts/wsteth#stethpertoken
 *
 * A Lido market's `cTokenAddr` is the wstETH address.
 *
 * @internal
 */
export async function exchangeRateLido (a: string, s: Provider | Signer): Promise<string | undefined> {

    const contract = new Contract(a, WSTETH_ABI, s) as wstETHContract;

    return (await contract.stEthPerToken()).toString();
}

/**
 * Lido's interestRate implementation.
 *
 * @remarks
 * https://docs.lido.fi/integrations/api#last-lido-apr-for-steth
 *
 * @internal
 */
export async function interestRateLido (): Promise<string | undefined> {

    const res = await fetch(request(LIDO_API, 'GET'));

    const data = await response<LidoApiSchema>(res);

    return stringify(data.data.apr / 100);
}
