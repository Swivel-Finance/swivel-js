import { BigNumber, Contract } from 'ethers';

/**
 * An interface for a subset of Lido's wstETH ABI.
 *
 * @remarks
 * https://docs.lido.fi/contracts/wsteth
 */
export interface wstETHContract extends Contract {
    stETH (): Promise<string>;
    stEthPerToken (): Promise<BigNumber>;
}

/**
 * An interface for Lido's API response.
 *
 * @remarks
 * https://eth-api.lido.fi/api/static/index.html#/APR%20for%20Eth%20and%20stEth/ProtocolController_findLastAPRforSTETH
 */
export interface LidoApiSchema {
    data: {
        timeUnix: number;
        apr: number;
    };
    meta: {
        symbol: string;
        address: string;
        chainId: number;
    };
}
