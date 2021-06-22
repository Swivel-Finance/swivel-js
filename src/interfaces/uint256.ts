/**
 * A helper type for BigNumber compatible types.
 *
 * @remarks
 * This type could also use {@link ethers.BigNumberish}, however we don't want to couple
 * this type and our swivel-js interfaces to any vendor-specific BigNumber implementation.
 */
export type uint256 = number | ArrayLike<number> | bigint | string;
