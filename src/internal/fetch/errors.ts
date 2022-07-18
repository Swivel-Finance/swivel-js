/**
 * HTTP-related errors.
 */
const ERRORS = {
    BAD_REQUEST: {
        name: 'HTTP.BAD_REQUEST',
        message: 'Bad request.',
    },
    UNAUTHORIZED: {
        name: 'HTTP.UNAUTHORIZED',
        message: 'Access not authorized.',
    },
    FORBIDDEN: {
        name: 'HTTP.FORBIDDEN',
        message: 'Access forbidden.',
    },
    NOT_FOUND: {
        name: 'HTTP.NOT_FOUND',
        message: 'Resource not found.',
    },
    INTERNAL: {
        name: 'HTTP.INTERNAL',
        message: 'Internal server error.',
    },
    UNKNOWN: {
        name: 'HTTP.UNKNOWN',
        message: 'Unknown server error.',
    },
    BAD_RESPONSE: {
        name: 'HTTP.BAD_RESPONSE',
        message: 'Unable to parse response.',
    },
    NETWORK: {
        name: 'HTTP.NETWORK',
        message: 'Network error.',
    },
} as const;

/**
 * A mapping of response status codes to errors.
 */
const ERROR_CODES = {
    400: ERRORS.BAD_REQUEST,
    401: ERRORS.UNAUTHORIZED,
    403: ERRORS.FORBIDDEN,
    404: ERRORS.NOT_FOUND,
    500: ERRORS.INTERNAL,
    'DEFAULT': ERRORS.UNKNOWN,
} as const;

/**
 * Create an error instance from a status code or error name.
 *
 * @param c - the status code or error name
 */
export const getError = (c: number | keyof typeof ERROR_CODES | keyof typeof ERRORS): Error => {

    const data = ERROR_CODES[c as keyof typeof ERROR_CODES]
        ?? ERRORS[c as keyof typeof ERRORS]
        ?? ERROR_CODES['DEFAULT'];

    const error = new Error(data.message);
    error.name = data.name;

    return error;
};
