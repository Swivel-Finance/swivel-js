import type { BigNumber, Contract } from 'ethers';
import { Token } from '../../../token/index.js';

/**
 * An interface for a subset of Yearn's Vault contract.
 *
 * @remarks
 * We only need the `pricePerShare` method of Yearn's Vault contract API.
 * https://docs.yearn.finance/vaults/smart-contracts/VaultAPI#pricepershare
 */
export interface YearnVaultContract extends Contract {
    pricePerShare (): Promise<BigNumber>;
    getRatio (): Promise<BigNumber>;
}

/**
 * An interface for a subset of Yearn's API schema.
 *
 * @remarks
 * https://docs.yearn.finance/vaults/yearn-api
 */
export interface YearnApiSchema {
    address: string;
    symbol: string;
    name: string;
    decimals: number;
    token: Token;
    apy: {
        type: string;
        gross_apr: number;
        net_apy: number;
    },
    type: string;
    endorsed: boolean;
    emergency_shutdown: boolean;
}
