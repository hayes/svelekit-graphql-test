import type { RequestHandler } from '@sveltejs/kit';
import type { JSONValue } from '@sveltejs/kit/types/endpoint';
import {
	getGraphQLParameters,
	processRequest,
	renderGraphiQL,
	shouldRenderGraphiQL
} from 'graphql-helix';

import { schema } from '../graphql/schema';

const handler: RequestHandler = async (req) => {
	const request = {
		body: req.body,
		headers: req.headers,
		method: req.method,
		query: ''
	};

	if (shouldRenderGraphiQL(request)) {
		return {
			body: renderGraphiQL()
		};
	} else {
		const { operationName, query, variables } = getGraphQLParameters(request);

		const result = await processRequest({
			operationName,
			query,
			variables,
			request,
			schema
		});

		if (result.type === 'RESPONSE') {
			const headers: Record<string, string> = {};
			result.headers.forEach(({ name, value }) => (headers[name] = value));

			return {
				headers,
				status: result.status,
				body: result.payload as JSONValue
			};
		}

		// See graphql helix docs for more complete implementation
		throw new Error('Other response types not currently implemented');
	}
};

export const get = handler;
export const post = handler;
