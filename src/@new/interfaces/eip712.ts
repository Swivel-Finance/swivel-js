// EIP-712 Typed Data
// See: https://eips.ethereum.org/EIPS/eip-712

// export type Bytes = ArrayLike<number>;
// export type BytesLike = Bytes | string;
// export type BigNumberLike = bigint | string | number;

export interface TypedDataDomain {
    name?: string;
    version?: string;
    chainId?: bigint | string | number;
    verifyingContract?: string;
    salt?: ArrayLike<number> | string;
}

export interface TypedDataField {
    name: string;
    type: string;
}
