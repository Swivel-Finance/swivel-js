import { Provider } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { Protocols } from '../../types/index.js';
import { DEFAULT_RATES_CONFIG, RatesConfig } from './config.js';
import { exchangeRateAave, exchangeRateCERC20, exchangeRateERC4626, exchangeRateEuler, exchangeRateYearn, interestRateAave, interestRateCERC20, interestRateERC4626, interestRateEuler, interestRateYearn } from './protocols/index.js';

/**
 * Retrieve the exchange rate for a lending protocol and cToken/pool.
 *
 * @param p - protocol enum value of the lending protocol associated with a swivel market
 * @param a - address of the market's cToken
 * @param s - ethers provider or signer
 * @param c - optional rates configuration object
 * @returns the exchange rate of the protocol's cToken/pool to underlying (the scale of the value depends on the protocol)
 */
export async function getExchangeRate (p: Protocols, a: string, s: Provider | Signer, c?: RatesConfig): Promise<string | undefined> {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const config = { ...DEFAULT_RATES_CONFIG, ...c };

    switch (p) {

        case Protocols.Compound: // fall-through: Compound and Rari both use CERC-20 cToken
        case Protocols.Rari:

            return await exchangeRateCERC20(a, s);

        case Protocols.Yearn:

            return await exchangeRateYearn(a, s);

        case Protocols.Euler:

            return await exchangeRateEuler(a, s);

        case Protocols.Aave:

            return await exchangeRateAave(a, s);

        case Protocols.Erc4626:

            return await exchangeRateERC4626(a, s);

        default:

            throw 'Unsupported protocol.';
    }
}

/**
 * Retrieve the interest rate (supply APY) for a lending protocol and cToken/pool.
 *
 * @param p - protocol enum value of the lending protocol associated with a swivel market
 * @param a - address of the market's cToken
 * @param s - ethers provider or signer
 * @param c - optional rates configuration object
 * @returns the interest rate of the protocol's cToken/pool (as a fraction 1/100%)
 */
export async function getInterestRate (p: Protocols, a: string, s: Provider | Signer, c?: RatesConfig): Promise<string | undefined> {

    const config = { ...DEFAULT_RATES_CONFIG, ...c };

    switch (p) {

        case Protocols.Compound: // fall-through: Compound and Rari both use CERC-20 cToken
        case Protocols.Rari:

            return await interestRateCERC20(a, s);

        case Protocols.Yearn:

            return await interestRateYearn(a, s);

        case Protocols.Euler:

            return await interestRateEuler(a, s, config.Euler);

        case Protocols.Aave:

            return await interestRateAave(a, s);

        case Protocols.Erc4626:

            return interestRateERC4626();

        default:

            throw 'Unsupported protocol.';
    }
}