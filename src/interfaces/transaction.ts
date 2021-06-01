export interface TxOptions {
    to?: string;
    from?: string;
    gasPrice?: number | string;
    gasLimit?: number | string;
    value?: number | string;
    data?: unknown;
}

export interface TxResponse {
    hash: string;
}
