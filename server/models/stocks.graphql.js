const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLFloat,
} = require("graphql");

/**
 * Construct a GraphQL schema and define the necessary resolvers.
 *
 * type Stock {
 *   symbol: String
 *   price: Float
 *   changePercent: Float
 * }
 */
const schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: "Stock",
		fields: {
			symbol: {
				type: GraphQLString,
				resolve: () => "AAPL",
			},
			price: {
				type: GraphQLFloat,
				resolve: () => 123.45,
			},
			changePercent: {
				type: GraphQLFloat,
				resolve: () => 0.12,
			},
		},
	}),
});

module.exports = schema;
