const { Express, Request, Response } = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });
const { version } = require("../../package.json");

// const options = {
// 	definition: {
// 		openapi: "3.0.0",
// 		info: {
// 			title: "Stock Trading Simulator API",
// 			version: version,
// 			description: "A REST API for the Stock Trading Simulator",
// 		},
// components: {
// 	securitySchemes: {
// 		bearerAuth: {
// 			type: "http",
// 			scheme: "bearer",
// 			bearerFormat: "JWT",
// 		},
// 	},
// },
// security: [
// 	{
// 		bearerAuth: [],
// 	},
// ],
// 	},
// };

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes.js"];

function swaggerDocs(app, port) {
	const doc = {
		info: {
			title: "Stock Trading Simulator API",
			description: "A REST API for the Stock Trading Simulator",
			version,
		},
		host: "localhost:" + port,
		securityDefinitions: {
			bearerAuth: {
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT",
			},
		},
	};

	swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
		const swaggerDocument = require("." + outputFile);
		app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
		console.log(`Swagger docs available at http://localhost:${port}/docs`);
	});
}

exports.swaggerDocs = swaggerDocs;
