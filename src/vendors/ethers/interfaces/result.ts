/**
 * The ethers.js `Result` interface.
 *
 * @remarks
 * {@link https://docs.ethers.io/v5/api/utils/abi/interface/#Result}
 */
export type Result<T extends unknown[]> = T & { [key: string]: unknown; };
