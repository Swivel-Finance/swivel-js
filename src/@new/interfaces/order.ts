export interface Order {
    key: string;
    maker: string;
    underlying: string;
    vault: boolean;
    exit: boolean;
    principal: string;
    premium: string;
    maturity: string;
    expiry: string;
}
