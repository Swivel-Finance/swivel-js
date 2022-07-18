import { Provider } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { Contract } from 'ethers';
import { fetch, request, response } from '../../../fetch/index.js';
import { BASE_DECIMALS, getChain } from '../../helpers/index.js';
import { YEARN_ABI, YEARN_API } from './constants.js';
import { YearnApiSchema, YearnVaultContract } from './types.js';

/**
 * Yearn's exchangeRate implementation.
 *
 * @remarks
 * https://docs.yearn.finance/vaults/smart-contracts/VaultAPI#pricepershare
 *
 * A Yearn market's `cTokenAddr` is the Yearn vault address.
 *
 * @internal
 */
export async function exchangeRateYearn (a: string, s: Provider | Signer): Promise<string | undefined> {

    const contract = new Contract(a, YEARN_ABI, s) as YearnVaultContract;

    let exchangeRate: string | undefined;

    try {

        exchangeRate = (await contract.pricePerShare()).toString();

    } catch (error1) {

        try {

            exchangeRate = (await contract.getRatio()).toString();

        } catch (error2) {

            throw error1 ?? error2;
        }
    }

    return exchangeRate;
}

/**
 * Yearn's interestRate implementation.
 *
 * @remarks
 * https://docs.yearn.finance/vaults/yearn-api
 *
 * A Yearn market's `cTokenAddr` is the Yearn vault address.
 *
 * @internal
 */
export async function interestRateYearn (a: string, s: Provider | Signer): Promise<string | undefined> {

    const chain = await getChain(s);

    const res = await fetch(request(YEARN_API(chain), 'GET'));

    const vaults = await response<YearnApiSchema[]>(res);

    const vault = vaults.find(vault => vault.address === a);

    if (!vault) throw new Error(`Vault '${ a }' not found.`);

    return vault.apy.net_apy.toFixed(BASE_DECIMALS);
}
