import { Protocols } from './protocol.js';

/**
 * A Swivel order.
 */
export interface Order {
    key: string;
    protocol: Protocols;
    maker: string;
    underlying: string;
    vault: boolean;
    exit: boolean;
    principal: string;
    premium: string;
    maturity: string;
    expiry: string;
}
