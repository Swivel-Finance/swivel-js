import { uint256 } from './uint256.js';

export interface TxOptions {
    to?: string;
    from?: string;
    gasPrice?: uint256;
    gasLimit?: uint256;
    value?: uint256;
    data?: unknown;
}

export interface TxResponse {
    hash: string;
}
