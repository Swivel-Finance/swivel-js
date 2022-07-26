import { utils } from 'ethers';
import { SWIVEL_ABI } from '../constants/index.js';
import { Exception, ExceptionResult, isStaticCallError, isUnpredictableGasLimitError } from './types.js';

// swivel abi for decoding exception data
const SWIVEL_INTERFACE = new utils.Interface(SWIVEL_ABI);

// abi fragment name of the custom error
const SWIVEL_ERROR_FRAGMENT = 'Exception';

/**
 * Parses the custom error data from an `UNPREDICTABLE_GAS_LIMIT` or `CALL_EXCEPTION` error.
 *
 * @param error - an ethers error/rejection reason that may contain custom error data
 * @returns an {@link Exception} if the error contains custom error data, `undefined` otherwise
 *
 * @example
 */
export const parseException = (error: unknown): Exception | undefined => {

    // parse custom error data from an unpredictable gas limit error
    if (isUnpredictableGasLimitError(error)) {

        try {

            const [code, amount, amountExpected, address, addressExpected] = SWIVEL_INTERFACE.decodeErrorResult(
                SWIVEL_ERROR_FRAGMENT,
                error.error.error.error.data,
            ) as ExceptionResult;

            return {
                code,
                amount,
                amountExpected,
                address,
                addressExpected,
            };

        } catch (error) {

            // if we can't successfully parse the error data, there wasn't a custom error
            // we can ignore that and return undefined
        }
    }

    // parse custom error data from a `callStatic` call exception
    if (isStaticCallError(error)) {

        const [code, amount, amountExpected, address, addressExpected] = error.errorArgs as ExceptionResult;

        return {
            code,
            amount,
            amountExpected,
            address,
            addressExpected,
        };
    }
};
