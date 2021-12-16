import { Contract, ethers, Signer } from 'ethers';
import { Abi, Market, MarketPlaceContract, TxResponse, uint256 } from '../../../interfaces';
import { fromBigNumber, gasOptions, toBigNumber, unwrap } from '../utils';

/**
 * An internal type solely for ethers.js market struct response.
 *
 * @internal
 */
type MarketResponse = string[] & {
    cTokenAddr: string;
    zcTokenAddr: string;
    vaultAddr: string;
    maturityRate: ethers.BigNumber;
};

export class EthersMarketPlaceContract implements MarketPlaceContract {

    protected contract: Contract;

    address: string;

    /**
     * Creates a new ethers.js specific market place contract wrapper.
     *
     * @param address - address of the deployed market place contract
     * @param abi - the abi of the market place contract
     * @param s - an ethers.js signer instance
     */
    constructor (address: string, abi: Abi, s: Signer) {

        this.contract = new Contract(address, abi, s);
        this.address = this.contract.address;
    }

    /**
     * Returns the admin address.
     */
    async admin (): Promise<string> {

        return unwrap<string>(await this.contract.functions.admin());
    }

    /**
     * Returns the associated swivel contract address.
     */
    async swivel (): Promise<string> {

        return unwrap<string>(await this.contract.functions.swivel());
    }

    /**
     * Returns the associated swivel contract address.
     */
    async paused (): Promise<boolean> {

        return unwrap<boolean>(await this.contract.functions.paused());
    }

    /**
     * Retrieve the market information.
     *
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     */
    async markets (u: string, m: uint256): Promise<Market> {

        // when a contract returns a struct, ethers.js returns it kinda unwrapped!
        // [
        //   '0x6D7F0754FFeb405d23C51CE938289d4835bE3b14',
        //   '0xc4a28965e4d852eEeEC492Efbc42d1f92fB741ba',
        //   '0xD319d0EfdB6c44bd7559938624fce7a466bDcfF8',
        //   cTokenAddr: '0x6D7F0754FFeb405d23C51CE938289d4835bE3b14',
        //   zcTokenAddr: '0xc4a28965e4d852eEeEC492Efbc42d1f92fB741ba',
        //   vaultAddr: '0xD319d0EfdB6c44bd7559938624fce7a466bDcfF8'
        // ]

        const maturity = toBigNumber(m);

        const market = await this.contract.functions.markets(u, maturity) as MarketResponse;

        return {
            cTokenAddr: market.cTokenAddr,
            zcTokenAddr: market.zcTokenAddr,
            vaultAddr: market.vaultAddr,
            maturityRate: fromBigNumber(market.maturityRate),
        };
    }

    /**
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     */
    async matureMarket (u: string, m: uint256): Promise<TxResponse> {

        const maturity = toBigNumber(m);

        return await this.contract.functions.matureMarket(u, maturity) as TxResponse;
    }

    /**
     * @param u - underlying token address associated with the market
     * @param m - maturity timestamp of the market
     * @param t - target to be transferred to
     * @param a - amount of notional to be transferred
     */
    async transferVaultNotional (u: string, m: uint256, t: string, a: uint256): Promise<TxResponse> {

        const maturity = toBigNumber(m);
        const amount = toBigNumber(a);

        const options = await gasOptions(this.contract, 'transferVaultNotional', u, maturity, t, amount);

        return await this.contract.functions.transferVaultNotional(u, maturity, t, amount, options) as TxResponse;
    }
}
