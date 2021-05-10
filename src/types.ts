import type { JSONValue } from '@sveltejs/kit/types/endpoint';

export type Request<Context = any> = {
	host: string;
	method: 'GET';
	headers: Record<string, string>;
	path: string;
	params: Record<string, string | string[]>;
	query: URLSearchParams;
	rawBody: string | Uint8Array;
	body: string | Uint8Array | JSONValue;
	locals: Record<string, any>; // see below
};

export type Response = {
	status?: number;
	headers?: Record<string, string>;
	body?: any;
};

export type RequestHandler<Context = any> = (
	request: Request<Context>
) => Response | Promise<Response>;
