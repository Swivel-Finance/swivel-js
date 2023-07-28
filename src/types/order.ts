import { Protocol } from './protocol.js';

/**
 * A Swivel order.
 */
export interface Order {
    key: string;
    protocol: Protocol;
    maker: string;
    underlying: string;
    vault: boolean;
    exit: boolean;
    principal: string;
    premium: string;
    maturity: string;
    expiry: string;
}
