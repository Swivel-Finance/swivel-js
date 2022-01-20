import { Result } from '../interfaces/index.js';

/**
 * Unwraps an ethers.js `Result` object.
 *
 * @remarks
 * Use only for constract getters or methods which are read-only and return a single value.
 * {@link https://docs.ethers.io/v5/api/contract/contract/#Contract--readonly}
 *
 * @param r - an ethers.js `Result` object
 * @returns - the unwrapped value of the `Result` object
 */
export const unwrap = <T> (r: Result<[T]>): T => r[0];
