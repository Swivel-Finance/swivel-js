import { EULER_ADDRESSES } from './helpers/constants.js';

/**
 * An interface for configuration options required to perform rate calculations.
 *
 * @internal
 */
export interface RatesConfig {
    Euler: {
        ADDRESSES: Record<number, Record<'MARKETS', string>>;
    };
}

/**
 * The default {@link RatesConfig} value.
 *
 * @internal
 */
export const DEFAULT_RATES_CONFIG: RatesConfig = {
    Euler: {
        ADDRESSES: EULER_ADDRESSES,
    },
};
