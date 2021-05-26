/**
 * @remarks
 * Interfaces for, supporting or generally having-to-do-with a Transactions
 */
import { Nos } from '../@types';
export interface TxOpts {
    to?: string;
    from?: string;
    gasPrice?: Nos;
    gasLimit?: Nos;
    value?: Nos;
    data?: any;
}
export interface TxResponse {
    hash: string;
}
//# sourceMappingURL=transaction.d.ts.map