import { builder } from '../builder';

builder.queryType({
	fields: (t) => ({
		hello: t.string({
			args: {
				name: t.arg.string({})
			},
			resolve: (_root, args) => `hello, ${args.name || 'World'}!`
		})
	})
});
