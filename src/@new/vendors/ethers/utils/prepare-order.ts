import { ethers, utils } from 'ethers';
import { Order } from '../../../interfaces';

/**
 * The `ethers.js` specific version of an {@link Order}.
 */
export interface EthersOrder {
    key: Uint8Array;
    maker: string;
    underlying: string;
    vault: boolean;
    exit: boolean;
    principal: ethers.BigNumber;
    premium: ethers.BigNumber;
    maturity: ethers.BigNumber;
    expiry: ethers.BigNumber;
}

/**
 * Converts an {@link Order} into an `ethers.js` specific order.
 *
 * @param o - the order to convert
 */
export function prepareOrder (o: Order): EthersOrder {

    return {
        key: utils.arrayify(o.key),
        maker: o.maker,
        underlying: o.underlying,
        vault: o.vault,
        exit: o.exit,
        principal: ethers.BigNumber.from(o.principal),
        premium: ethers.BigNumber.from(o.premium),
        maturity: ethers.BigNumber.from(o.maturity),
        expiry: ethers.BigNumber.from(o.expiry),
    };
}
