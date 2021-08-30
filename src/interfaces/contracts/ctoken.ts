import { TxResponse } from '../transaction';
import { uint256 } from '../uint256';

export interface CTokenContract {

    address?: string;

    /**
     * @param t - address to
     * @param a - amount to split
     */
    allocateTo (t: string, a: uint256): Promise<TxResponse>;

}
