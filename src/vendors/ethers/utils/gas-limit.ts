import { ethers } from 'ethers';

/**
 * This value has been determined after testing all `order - fill` pairings and recording the difference
 * between `ethers`' `estimateGas` and the tx's `gasUsed`.
 */
const GAS_LIMIT_DELTA = ethers.BigNumber.from('26000');

/**
 * Calculates a higher gas limit to prevent out-of-gas errors in certain situations.
 *
 * @param e - The estimated gas for a contract call
 * @returns A gas limit higher than the estimated gas
 */
export const gasLimit = (e: ethers.BigNumber): ethers.BigNumber => {

    return e.add(GAS_LIMIT_DELTA);
};

/**
 * Creates an {@link ethers.Overrides} object containing a custom `gasLimit`.
 *
 * @param c - A contract instance
 * @param m - A method name on the contract
 * @param a - The arguments for the contract call
 * @returns The {@link ethers.Overrides} object containing a custom gas limit for the specified contract call
 */
export const gasOptions = async (c: ethers.Contract, m: string, ...a: unknown[]): Promise<Partial<{ gasLimit: ethers.BigNumber; }>> => {

    let options = {};

    try {

        const estimate = await c.estimateGas[m](...a);

        options = { gasLimit: gasLimit(estimate) };

    } catch (error) {

        // ignore failure to estimate gas: in this case we let ethers use the default gas options
    }

    return options;
};
