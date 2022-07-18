import { Provider } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { Contract } from 'ethers';
import { CERC20_ABI } from './constants.js';
import { CERC20Contract, CToken, Token } from './types.js';

export { CERC20_ABI, ERC20_ABI } from './constants.js';
export { CERC20Contract, CToken, ERC20Contract, Token } from './types.js';

/**
 * A cache for fetched token info.
 */
const cache = new Map<string, Token>();

/**
 * Returns an ERC-20/CERC-20's token information.
 *
 * @param a - ERC-20/CERC-20 token address
 */
export async function getToken (a: string, p: Provider | Signer): Promise<Token | CToken> {

    if (cache.has(a)) {

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return cache.get(a)!;
    }

    const contract = new Contract(a, CERC20_ABI, p) as Contract & CERC20Contract;

    const [name, symbol, decimals] = await Promise.all([
        contract.name(),
        contract.symbol(),
        contract.decimals(),
    ]);

    const token: Token = {
        address: a,
        name,
        symbol,
        decimals,
    };

    try {

        const [exchangeRateCurrent, supplyRatePerBlock] = (await Promise.all([
            contract.exchangeRateCurrent(),
            contract.supplyRatePerBlock(),
        ])).map(rate => rate.toString());

        (token as CToken).exchangeRateCurrent = exchangeRateCurrent;
        (token as CToken).supplyRatePerBlock = supplyRatePerBlock;

    } catch (error) {

        // if this fails, we just have a normal ERC20...
    }

    cache.set(a, token);

    return token;
}

