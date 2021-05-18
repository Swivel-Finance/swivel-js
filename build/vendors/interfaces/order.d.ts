import { ethers } from 'ethers';
export interface ValidOrder {
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
