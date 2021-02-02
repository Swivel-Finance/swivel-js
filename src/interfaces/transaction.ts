/**
 * @remarks
 * Interfaces for, supporting or generally having-to-do-with a Transactions
 */

import { Nos } from '../@types'

export interface TransactOpts {
  to?: string;
  from?: string;
  gasPrice?: Nos;
  gasLimit?: Nos;
  value?: Nos;
  data?: any;
}
