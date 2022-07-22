/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/quotes */
import { BigNumber } from 'ethers';

export const EXCEPTION = {
    0: {
        name: 'UNAUTHORIZED',
        message: (e: Exception): string => `Unauthorized.`,
    },
    1: {
        name: 'MARKET.PAUSED',
        message: (e: Exception): string => `Market is paused.`,
    },
    2: {
        name: 'ORDER.CANCELLED',
        message: (e: Exception): string => `Order is cancelled.`,
    },
    3: {
        name: 'ORDER.EXPIRED',
        message: (e: Exception): string => `Order is expired.`,
    },
    4: {
        name: 'ORDER.SIGNATURE',
        message: (e: Exception): string => `Order signature is invalid.`,
    },
    5: {
        name: 'ORDER.AMOUNT',
        message: (e: Exception): string => `Requested amount ${ e.amount.toString() } exceeds order volume ${ e.amountExpected.toString() }.`,
    },
    6: {
        name: 'DEPOSIT',
        message: (e: Exception): string => `Failed to deposit underlying.`,
    },
    7: {
        name: 'WITHDRAW',
        message: (e: Exception): string => `Failed to withdraw underlying.`,
    },
    8: {
        name: 'MARKETPLACE.CUSTODIAL_INITIATE',
        message: (e: Exception): string => `MarketPlace custodialInitiate failed.`,
    },
    9: {
        name: 'MARKETPLACE.CUSTODIAL_EXIT',
        message: (e: Exception): string => `MarketPlace custodialExit failed.`,
    },
    10: {
        name: 'MARKETPLACE.TRANSFER_VAULT_NOTIONAL_FEE',
        message: (e: Exception): string => `MarketPlace transferVaultNotionalFee failed.`,
    },
    11: {
        name: 'MARKETPLACE.P2P_ZC_TOKEN_EXCHANGE',
        message: (e: Exception): string => `MarketPlace p2pZcTokenExchange failed.`,
    },
    12: {
        name: 'MARKETPLACE.P2P_VAULT_EXCHANGE',
        message: (e: Exception): string => `MarketPlace p2pVaultExchange failed.`,
    },
    13: {
        name: 'MARKETPLACE.MINT_ZC_TOKEN_ADDING_NOTIONAL',
        message: (e: Exception): string => `MarketPlace mintZcTokenAddingNotional failed.`,
    },
    14: {
        name: 'MARKETPLACE.BURN_ZC_TOKEN_ADDING_NOTIONAL',
        message: (e: Exception): string => `MarketPlace burnZcTokenAddingNotional failed.`,
    },
    15: {
        name: 'ORDER.MAKER',
        message: (e: Exception): string => `Sender ${ e.address } must be maker.`,
    },
    16: {
        name: 'WITHDRAWAL.SCHEDULE',
        message: (e: Exception): string => `Withdrawal not scheduled.`,
    },
    17: {
        name: 'WITHDRAWAL.HOLD',
        message: (e: Exception): string => `Withdrawal on hold.`,
    },
    18: {
        name: 'FEE',
        message: (e: Exception): string => `Fee too high.`,
    },
    // TODO: this one is used for approveUnderlying and setFee, in both cases the arrays contain different things
    19: {
        name: 'ARGUMENT.ARRAY_MISMATCH',
        message: (e: Exception): string => `Provided array lengths are not equal.`,
    },
    20: {
        name: 'SWIVEL.ADDRESS.SET',
        message: (e: Exception): string => `Swivel address already set.`,
    },
    21: {
        name: 'SWIVEL.ADDRESS.UNSET',
        message: (e: Exception): string => `Swivel address not set.`,
    },
    22: {
        name: 'MARKET.EXISTS',
        message: (e: Exception): string => `Market already exists.`,
    },
    23: {
        name: 'MARKET.MATURED',
        message: (e: Exception): string => `Market is already matured.`,
    },
    24: {
        name: 'MARKET.UNMATURED',
        message: (e: Exception): string => `Market is not matured.`,
    },
    25: {
        name: 'VAULTTRACKER.ADD_NOTIONAL',
        message: (e: Exception): string => `VaultTracker addNotional failed.`,
    },
    26: {
        name: 'VAULTTRACKER.REMOVE_NOTIONAL',
        message: (e: Exception): string => `VaultTracker removeNotional failed.`,
    },
    27: {
        name: 'VAULTTRACKER.TRANSFER_NOTIONAL_FROM',
        message: (e: Exception): string => `VaultTracker transferNotionalFrom failed.`,
    },
    28: {
        name: 'ZC_TOKEN.MINT',
        message: (e: Exception): string => `zcToken mint failed.`,
    },
    29: {
        name: 'ZC_TOKEN.BURN',
        message: (e: Exception): string => `zcToken burn failed.`,
    },
    30: {
        name: 'MARKETPLACE.MATURE_MARKET',
        message: (e: Exception): string => `MarketPlace matureMarket failed.`,
    },
    31: {
        name: 'VAULT.AMOUNT',
        message: (e: Exception): string => `Requested amount ${ e.amount.toString() } exceeds vault notional ${ e.amountExpected.toString() }.`,
    },
    32: {
        name: 'VAULT.SELF',
        message: (e: Exception): string => `Cannot transfer notional to self ${ e.address }.`,
    },
    // TODO: This error seems not to be used
    33: {
        name: 'MARKETPLACE.ADDRESS',
        message: (e: Exception): string => `MarketPlace address is not set.`,
    },
};

export type ExceptionCode = keyof typeof EXCEPTION;

/**
 * Interface for custom errors thrown by Swivel's contracts.
 */
export interface Exception {
    code: ExceptionCode;
    amount: BigNumber;
    amountExpected: BigNumber;
    address: string;
    addressExpected: string;
}

/**
 * A custom error class for Swivel contract exceptions.
 *
 * @remarks
 * Takes an {@link Exception} and turns it into a SwivelError instance.
 * Retains the `code` and `data` of the original exception and adds
 * `name` and a formatted and descriptive `message`.
 */
export class SwivelError extends Error {

    name: string;

    message!: string;

    code: number;

    data: {
        amount: string;
        amountExpected: string;
        address: string;
        addressExpected: string;
    };

    constructor (e: Exception) {

        const message = EXCEPTION[e.code]?.message(e);
        const name = EXCEPTION[e.code]?.name;

        super(message);

        this.name = name;
        this.code = e.code;
        this.data = {
            address: e.address,
            addressExpected: e.addressExpected,
            amount: e.amount.toString(),
            amountExpected: e.amountExpected.toString(),
        };
    }
}
