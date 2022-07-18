import crossFetch, { Request, Response } from 'cross-fetch';
import { DEFAULT_REQUEST_INIT } from './constants.js';
import { getError } from './errors.js';
import { GetPayload, PostPayload, RequestMethod, RequestOptions, RequestPayload } from './types.js';

export async function fetch (input: RequestInfo | URL, init?: RequestInit): Promise<Response> {

    try {

        return await crossFetch(input, init);

    } catch (error) {

        // fetch only rejects on network errors (e.g. no connection, DNS errors)
        throw getError('NETWORK');
    }
}

/**
 * Create a fetch Request object for simpler fetch requests.
 *
 * @param u - the url to fetch
 * @param m - the request method to use
 * @param p - the request payload
 * @param i - optional request options (will be merged with default options)
 * @returns - a fetch Request object
 */
export function request (u: string, m: 'GET', p?: GetPayload, i?: RequestOptions): Request;
export function request (u: string, m: 'POST', p?: PostPayload, i?: RequestOptions): Request;
export function request (u: string, m: RequestMethod, p?: RequestPayload, i?: RequestOptions): Request {

    const url = new URL(u);
    const init = {
        ...DEFAULT_REQUEST_INIT[m],
        ...i,
    };

    if (m === 'GET') {

        if (p) {

            // TypeScript only allows Record<string, string>, however Record<string, string | number | boolean>
            // is implicitly converted and can be used just fine
            url.search = new URLSearchParams(p as string | string[][] | Record<string, string> | URLSearchParams).toString();
        }

    } else {

        if (p !== undefined) {

            init.body = JSON.stringify(p);
        }
    }

    return new Request(url.toString(), init);
}

/**
 * Parse and return a fetch Response's data.
 *
 * @param response - the fetch Response object
 * @param request - the fetch Request object (if available)
 * @returns - the parsed response value; throws appropriate errors if the request failed
 */
export async function response <T = unknown> (response: Response, request?: Request): Promise<T> {

    if (!response.ok) {

        if (response.status >= 400) {

            throw getError(response.status);
        }
    }

    try {

        const contentLength = response.headers.get('content-length');
        const contentType = response.headers.get('content-type') || request?.headers.get('accept');

        // check `204 No Content` status and content length to prevent parsing errors of empty responses
        if (response.status === 204 || contentLength === '0') {

            return undefined as unknown as T;
        }

        if (contentType) {

            if (/application\/json/.test(contentType)) {

                return await response.json() as T;
            }

            if (/text\//.test(contentType)) {

                return await response.text() as unknown as T;
            }
        }

        return undefined as unknown as T;

    } catch (error) {

        throw getError('BAD_RESPONSE');
    }
}
