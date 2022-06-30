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
export const gasLimit = (e: BigNumber): BigNumber => {

    return e.add(GAS_LIMIT_DELTA);
};

/**
 * Creates a {@link PayableOverrides} object with an optimized gas limit.
 *
 * @param t - transaction overrides provided by the user
 * @param c - contract instance
 * @param m - method name on the contract
 * @param a - arguments for the contract method call
 * @returns a {@link PayableOverrides} object with an optimized gas limit for the specified call
 */
export const optimizeGas = async (t: PayableOverrides, c: Contract, m: string, ...a: unknown[]): Promise<PayableOverrides> => {

    const options = { ...t };

    // user-provided `gasLimit` has precedence
    if (options.gasLimit) {

        return options;
    }

    try {

        const estimate = await c.estimateGas[m](...a, t);

        options.gasLimit = gasLimit(estimate);

    } catch (error) {

        // ignore failure to estimate gas: in this case we let ethers use the default gas options
    }

    return options;
};
