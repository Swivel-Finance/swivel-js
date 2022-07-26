import { BigNumber, Contract, PayableOverrides } from 'ethers';

/**
 * This value has been determined after testing all `order - fill` pairings and recording the difference
 * between `ethers`' `estimateGas` and the tx's `gasUsed`.
 */
const GAS_LIMIT_DELTA = BigNumber.from('26000');

/**
 * Calculates a higher gas limit to prevent out-of-gas errors in certain situations.
 *
 * @param e - estimated gas for a contract call
 * @returns estimated gas plus a predetermined buffer to prevent out-of-gas errors
 */
export const addGasLimitAdjustment = (e: BigNumber): BigNumber => {

    return e.add(GAS_LIMIT_DELTA);
};

/**
 * Creates a {@link PayableOverrides} object with an optimized gas limit.
 *
 * @param c - contract instance
 * @param m - method name on the contract
 * @param a - arguments for the contract method call
 * @param t - optional transaction overrides provided by the user
 * @returns a {@link PayableOverrides} object with an optimized gas limit for the specified call
 */
export const optimizeGas = async (
    c: Contract,
    m: string,
    a: unknown[],
    t: PayableOverrides = {},
): Promise<PayableOverrides> => {

    const options = { ...t };

    // user-provided `gasLimit` has precedence
    if (options.gasLimit) {

        return options;
    }

    // if `estimateGas` fails, we don't catch the error, as we want to
    // extract custom error data from the UNPREDICTABLE_GAS_LIMIT error
    const estimate = await c.estimateGas[m](...a, t);

    options.gasLimit = addGasLimitAdjustment(estimate);

    return options;
};
