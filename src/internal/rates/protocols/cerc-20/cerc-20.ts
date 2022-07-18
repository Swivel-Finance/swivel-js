import { Provider } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { BLOCKS_PER_DAY, DAYS_PER_YEAR } from '../../../../constants/index.js';
import { CToken, getToken } from '../../../token/index.js';
import { CERC20_MANTISSA } from './constants.js';

/**
 * CERC-20 exchangeRate implementation.
 *
 * @remarks
 * https://compound.finance/docs/ctokens#exchange-rate
 *
 * Compound's/Rari's CToken is a CERC-20 token.
 * CERC-20's `exchangeRate` returns an integer scaled by 1 * 10^(18 - 8 + Underlying Token Decimals).
 *
 * @internal
 */
export async function exchangeRateCERC20 (a: string, s: Provider | Signer): Promise<string | undefined> {

    const token = await getToken(a, s) as CToken;

    // this is different from pricePerShare in Yearn, where the price is scaled to underlying token decimals!!!
    return token.exchangeRateCurrent;
}

/**
 * CERC-20 interestRate implementation.
 *
 * @remarks
 * Compound's/Rari's CToken is a CERC-20 token.
 *
 * @internal
 */
export async function interestRateCERC20 (a: string, s: Provider | Signer): Promise<string | undefined> {

    const token = await getToken(a, s) as CToken;

    if (!token.supplyRatePerBlock) return;

    const rate = token.supplyRatePerBlock;

    return (Math.pow(Number(rate) / CERC20_MANTISSA * BLOCKS_PER_DAY + 1, DAYS_PER_YEAR) - 1).toString();
}
