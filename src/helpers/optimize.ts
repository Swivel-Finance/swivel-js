import { BigNumber, Contract, PayableOverrides } from 'ethers';
import { Protocol, Protocols } from '../types/protocol.js';

/**
 * This value has been determined after testing all `order - fill` pairings and recording the difference
 * between `ethers`' `estimateGas` and the tx's `gasUsed`.
 */
export const GAS_LIMIT_DELTA = BigNumber.from('26000');

/**
 * For Compound, it appears we need an even higher gas limit delta.
 */
export const GAS_LIMIT_DELTA_COMPOUND = BigNumber.from('35000');

/**
 * Get the recommended gas limit delta for the specified protocol.
 *
 * @param protocol - the market's protocol involved in the transaction
 * @returns the gas limit delta for the specified protocol
 */
export const getGasLimitAdjustment = (protocol: Protocol): BigNumber => {

    switch (protocol) {

        case Protocols.Compound:

            return GAS_LIMIT_DELTA_COMPOUND;

        default:

            return GAS_LIMIT_DELTA;
    }
};

/**
 * Calculates a higher gas limit to prevent out-of-gas errors in certain situations.
 *
 * @param e - estimated gas for a contract call
 * @param d - the gas limit delta to add to the estimated gas (default: `GAS_LIMIT_DELTA`)
 * @returns estimated gas plus a predetermined buffer to prevent out-of-gas errors
 */
export const addGasLimitAdjustment = (e: BigNumber, d: BigNumber = GAS_LIMIT_DELTA): BigNumber => {

    return e.add(d);
};

/**
 * Creates a {@link PayableOverrides} object with an optimized gas limit.
 *
 * @param c - contract instance
 * @param m - method name on the contract
 * @param a - arguments for the contract method call
 * @param t - optional transaction overrides provided by the user
 * @param d - the gas limit delta to add to the estimated gas (default: `GAS_LIMIT_DELTA`)
 * @returns a {@link PayableOverrides} object with an optimized gas limit for the specified call
 */
export const optimizeGas = async (
    c: Contract,
    m: string,
    a: unknown[],
    t: PayableOverrides = {},
    d: BigNumber = GAS_LIMIT_DELTA,
): Promise<PayableOverrides> => {

    const options = { ...t };

    // user-provided `gasLimit` has precedence
    if (options.gasLimit) {

        return options;
    }

    // if `estimateGas` fails, we don't catch the error, as we want to
    // extract custom error data from the UNPREDICTABLE_GAS_LIMIT error
    const estimate = await c.estimateGas[m](...a, t);

    options.gasLimit = addGasLimitAdjustment(estimate, d);

    return options;
};
