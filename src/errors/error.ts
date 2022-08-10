import { parseException } from './exception.js';
import { EXCEPTION, Exception } from './types.js';

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

/**
 * Parses the custom error data from an `UNPREDICTABLE_GAS_LIMIT` or `CALL_EXCEPTION` error.
 *
 * @param errorOrData - an ethers error/rejection reason that may contain custom error data or a string representing the abi-encoded exception data
 * @returns a {@link SwivelError} if `errorOrData` contains custom error data, `undefined` otherwise
 *
 * @example
 */
export const parseSwivelError = (errorOrData: unknown): SwivelError | undefined => {

    const exception = parseException(errorOrData);

    if (exception) {

        return new SwivelError(exception);
    }
};
