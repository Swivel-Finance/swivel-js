import { Nos } from '../@types';
export interface TransactOpts {
    to?: string;
    from?: string;
    gasPrice?: Nos;
    gasLimit?: Nos;
    value?: Nos;
    data?: any;
}
export interface TxResponse {
    blockNumber: number;
}
