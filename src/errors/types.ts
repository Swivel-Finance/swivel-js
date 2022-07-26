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

export type ExceptionResult = [ExceptionCode, BigNumber, BigNumber, string, string];

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
 * Interface for transaction data attached to ethers errors.
 */
export interface TransactionDetails {
    // from address
    from: string;
    // to address
    to: string;
    // abi encoded contract call
    data: string;
    maxPriorityFeePerGas?: BigNumber;
    maxFeePerGas?: BigNumber;
    gasLimit?: BigNumber;
}

/**
 * Interface for ethers UNPREDICTABLE_GAS_LIMIT error.
 */
export interface UnpredictableGasLimitError {
    reason: string;
    code: 'UNPREDICTABLE_GAS_LIMIT';
    error: {
        // should be 'execution reverted'
        reason: string;
        code: 'UNPREDICTABLE_GAS_LIMIT';
        method: 'estimateGas';
        transaction: TransactionDetails;
        error: {
            // seems to be 'processing response error' for reverts
            reason: string;
            // seems to be 'SERVER_ERROR' for reverts
            code: string;
            // JSON payload of the error, details available in the error property below
            body: string;
            error: {
                // seems to be 3 for reverts
                code: number;
                // this is our encoded `Exception` data
                data: string;
            };
            // JSON payload of the `eth_estimateGas` call
            requestBody: string;
            // 'POST'
            requestMethod: string;
            // the JSONRPC provider url, i.e. https://rinkeby.infura.io/v3/<API_KEY>
            url: string;
        };
    };
}

/**
 * Interface for ethers CALL_EXCEPTION error during `contract.callStatic` calls.
 */
export interface StaticCallError {
    code: 'CALL_EXCEPTION';
    // contract address
    address: string;
    // signature of the failed contract call
    method: string;
    // abi encoded contract call
    data: string;
    // parsed/decoded contract call arguments
    args: unknown[];
    // signature of the (custom) error
    errorSignature: string;
    // interface name of the error (`Exception` in case of Swivel v3)
    errorName: string;
    // parsed/decoded arguments passed to the (custom) error
    errorArgs: unknown[];
    transaction: TransactionDetails;
}

/**
 * A typeguard for {@link UnpredictableGasLimitError}s.
 */
export const isUnpredictableGasLimitError = (error: unknown): error is UnpredictableGasLimitError => {

    return (error as UnpredictableGasLimitError).code === 'UNPREDICTABLE_GAS_LIMIT'
        && (error as UnpredictableGasLimitError).error.code === 'UNPREDICTABLE_GAS_LIMIT'
        && (error as UnpredictableGasLimitError).error.method === 'estimateGas';
};

/**
 * A typeguard for {@link StaticCallError}s.
 */
export const isStaticCallError = (error: unknown): error is StaticCallError => {

    return (error as StaticCallError).code === 'CALL_EXCEPTION'
        && (error as StaticCallError).errorName === 'Exception'
        && (error as StaticCallError).errorArgs?.length > 0;
};
