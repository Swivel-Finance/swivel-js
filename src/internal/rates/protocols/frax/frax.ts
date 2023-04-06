import { Provider } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { fetch, request, response } from '../../../fetch/index.js';
import { stringify } from '../../helpers/index.js';
import { exchangeRateERC4626 } from '../erc-4626/erc-4626.js';
import { FRAX_API } from './constants.js';
import { FraxApiSchema } from './types.js';

/**
 * Frax's exchangeRate implementation.
 *
 * @remarks
 * https://docs.frax.finance/frax-ether/frxeth-and-sfrxeth
 *
 * A Frax market's `cTokenAddr` is the sfrxETH address and sfrxETH is a ERC-4626 compliant vault,
 * meaning we can use the ERC-4626 implementation.
 *
 * @internal
 */
export async function exchangeRateFrax (a: string, s: Provider | Signer): Promise<string | undefined> {

    return exchangeRateERC4626(a, s);
}

/**
 * Frax's interestRate implementation.
 *
 * @remarks
 * Frax's interest rate can be obtained via its public API.
 *
 * @internal
 */
export async function interestRateFrax (): Promise<string | undefined> {

    const res = await fetch(request(FRAX_API(), 'GET'));

    const data = await response<FraxApiSchema>(res);

    return stringify(data.sfrxethApr / 100);
}
