/**
 * Represents an ethers.js `Result` object, but adds support for typed tuples.
 *
 * {@link https://docs.ethers.io/v5/api/utils/abi/interface/#Result}
 */
export type Result<T extends unknown[]> = Readonly<T>;

/**
 * Unwrap an ethers.js `Result` object.
 *
 * @remarks
 * Use only for contract getters or methods which are readonly and only to unwrap simple return
 * values or tuples of simple return values.
 *
 * NB: Don't use this helper to unwrap structs, as this leads to loosing the property names.
 *
 * {@link https://docs.ethers.io/v5/api/contract/contract/#Contract--readonly}
 *
 * @param r - an ethers.js `Result` object
 * @returns - the unwrapped value of the `Result` object
 */
export const unwrap = <T, R extends unknown[] = T extends unknown[] ? T : [T]> (r: Result<R>): T => {

    const length = r.length;

    if (length <= 1) {

        return r[0] as T;
    }

    const result = [] as unknown[];

    for (let i = 0; i < length; i++) {

        result.push(r[i]);
    }

    return result as unknown as T;
};
