import type { Headers } from 'cross-fetch';

/**
 * Interface for additional request options to be compatible with `node-fetch`.
 *
 * @remarks
 * To keep the http service compatible with a potential node implementation using `node-fetch`,
 * we want to keep the request options at a subset of the supported props both for the native
 * and the node-based fetch api.
 */
export interface RequestOptions {
    body?: string | null;
    headers?: string[][] | Record<string, string> | Headers;
    method?: string;
    redirect?: 'error' | 'follow' | 'manual';
    signal?: AbortSignal | null;
}

export type GetPayload = string | string[][] | Record<string, string | number | boolean> | URLSearchParams;

export type PostPayload = unknown;

export type RequestPayload = GetPayload | PostPayload;

export type RequestMethod = 'GET' | 'POST';
