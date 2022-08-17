import { TransactionResponse } from '@ethersproject/abstract-provider';
import type { BigNumber, Contract } from 'ethers';

/**
 * An interface for a subset of the ERC-20 token contract.
 */
export interface ERC20Contract extends Contract {
    name (): Promise<string>;
    symbol (): Promise<string>;
    decimals (): Promise<number>;
    totalSupply (): Promise<BigNumber>;
    balanceOf (owner: string): Promise<BigNumber>;
    allowance (owner: string, spender: string): Promise<BigNumber>;
    approve (spender: string, value: BigNumber): Promise<TransactionResponse>;
}

/**
 * An interface for an ERC-20 token's information.
 */
export interface ERC20Token {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
}
