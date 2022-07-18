import { TransactionResponse } from '@ethersproject/abstract-provider';
import type { BigNumber, Contract } from 'ethers';

/**
 * An interface for a subset of the ERC-20 token contract.
 *
 * @remarks
 * We only need the read-only part of the ERC-20 token contract API.
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
 * An interface for a subset of the CERC-20 token contract.
 *
 * @remarks
 * We only need the read-only part of the CERC-20 token contract API.
 */
export interface CERC20Contract extends ERC20Contract {
    exchangeRateCurrent (): Promise<BigNumber>;
    supplyRatePerBlock (): Promise<BigNumber>;
}

/**
 * An interface for an ERC-20 token's information.
 */
export interface Token {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
}

/**
 * An interface for a CERC-20 token's information.
 */
export interface CToken extends Token {
    exchangeRateCurrent?: string;
    supplyRatePerBlock?: string;
}
