import { ethers } from 'ethers';

/**
 * The factor by which to increase the gas limit based on the estimated gas.
 *
 * @remarks
 * For lack of a better estimate, we're increasing the gas limit by 5% over the estimated gas.
 */
const GAS_LIMIT_FACTOR = 1.05;

/**
 * Calculates a gas limit which is 5% higher than the gas estimate.
 *
 * @param e - The estimated gas for a contract call
 * @returns A gas limit 5% higher than the estimated gas
 */
export const gasLimit = (e: ethers.BigNumber): ethers.BigNumber => {

    // we use the default format for FixedNumber which is 18 decimals
    const estimate = ethers.FixedNumber.from(e);

    // FixedNumber can't convert floats, we need to pass a string
    const factor = ethers.FixedNumber.from(GAS_LIMIT_FACTOR.toFixed(2));

    // calculate the new limit
    const limit = estimate.mulUnsafe(factor);

    // round up the FixedNumber and remove trailing '.0'
    return ethers.BigNumber.from(limit.ceiling().toString().replace(/\..*$/, ''));
};

/**
 * Creates an {@link ethers.Overrides} object containing a custom `gasLimit`.
 *
 * @param c - A contract instance
 * @param m - A method name on the contract
 * @param a - The arguments for the contract call
 * @returns The {@link ethers.Overrides} object containing a custom gas limit for the specified contract call
 */
export const gasOptions = async (c: ethers.Contract, m: string, ...a: unknown[]): Promise<{ gasLimit: ethers.BigNumber; } | void> => {

    let options;

    try {

        const estimate = await c.estimateGas[m](...a);

        options = { gasLimit: gasLimit(estimate) };

    } catch (error) {

        // ignore failure to estimate gas: in this case we let ethers use the default gas options
    }

    return options;
};
