import { RequestMethod, RequestOptions } from './types';

export const DEFAULT_REQUEST_HEADERS = {
    ACCEPT: {
        'accept': 'application/json',
    },
    CONTENT_TYPE: {
        'content-type': 'application/json',
    },
};

export const DEFAULT_REQUEST_INIT: Record<RequestMethod, RequestOptions> = {
    GET: {
        method: 'GET',
        headers: DEFAULT_REQUEST_HEADERS.ACCEPT,
    },
    POST: {
        method: 'POST',
        headers: {
            ...DEFAULT_REQUEST_HEADERS.ACCEPT,
            ...DEFAULT_REQUEST_HEADERS.CONTENT_TYPE,
        },
    },
};
