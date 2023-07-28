import { Provider } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { Protocol, Protocols } from '../../types/index.js';
import { DEFAULT_RATES_CONFIG, RatesConfig } from './config.js';
import { exchangeRateAave, exchangeRateCERC20, exchangeRateEuler, exchangeRateFrax, exchangeRateLido, exchangeRateYearn, interestRateAave, interestRateCERC20, interestRateEuler, interestRateFrax, interestRateLido, interestRateYearn } from './protocols/index.js';

/**
 * Retrieve the exchange rate for a lending protocol and cToken/pool.
 *
 * @remarks
 * We're going to leave the calculations for exchange rates in the code base for reference, however,
 * they are not used by swivel-js. To guarantee consistency between the exchange rates used by the
 * on-chain contracts and consumers of swivel-js, swivel-js will return the exchange rates directly
 * from the MarketPlace contract's `exchangeRate` method.
 *
 * @param p - protocol enum value of the lending protocol associated with a swivel market
 * @param a - address of the market's cToken
 * @param s - ethers provider or signer
 * @param c - optional rates configuration object
 * @returns the exchange rate of the protocol's cToken/pool to underlying (the scale of the value depends on the protocol)
 */
export async function getExchangeRate (p: Protocol, a: string, s: Provider | Signer, c?: RatesConfig): Promise<string | undefined> {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const config = { ...DEFAULT_RATES_CONFIG, ...c };

    switch (p) {

        case Protocols.Compound: // fall-through: Compound and Rari both use CERC-20 cToken
        case Protocols.Rari:

            return await exchangeRateCERC20(a, s);

        case Protocols.Yearn:

            return await exchangeRateYearn(a, s);

        case Protocols.Aave:

            return await exchangeRateAave(a, s);

        case Protocols.Euler:

            return await exchangeRateEuler(a, s);

        case Protocols.Lido:

            return await exchangeRateLido(a, s);

        case Protocols.Frax:

            return await exchangeRateFrax(a, s);

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
export async function getInterestRate (p: Protocol, a: string, s: Provider | Signer, c?: RatesConfig): Promise<string | undefined> {

    const config = { ...DEFAULT_RATES_CONFIG, ...c };

    switch (p) {

        case Protocols.Compound: // fall-through: Compound and Rari both use CERC-20 cToken
        case Protocols.Rari:

            return await interestRateCERC20(a, s);

        case Protocols.Yearn:

            return await interestRateYearn(a, s);

        case Protocols.Aave:

            return await interestRateAave(a, s);

        case Protocols.Euler:

            return await interestRateEuler(a, s, config.Euler);

        case Protocols.Lido:

            return await interestRateLido(a, s);

        case Protocols.Frax:

            return interestRateFrax();

        default:

            throw 'Unsupported protocol.';
    }
}
