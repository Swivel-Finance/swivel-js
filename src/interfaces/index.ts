/*
 * index file which allows declaration of small, utility interfaces
 * as well as the re-export (barrel pattern) of interfaces within this dir
 */

import { Nos } from '../@types'

export interface Keyed {
  [key: string]: any;
}

export interface TransactOpts {
  to?: string;
  from?: string;
  gasPrice?: Nos;
  gasLimit?: Nos;
  value?: Nos;
  data?: any;
}
