import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerAutogen from "swagger-autogen";
import { version } from "../../package.json";

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
const endpointsFiles = ["./routes"];

function swaggerDocs(app: Express, port: number) {
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

	const autogen = swaggerAutogen({ openapi: "3.0.0" })(
		outputFile,
		endpointsFiles,
		doc,
	).then(() => {
		const swaggerDocument = require("." + outputFile);
		app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
		console.log(`Swagger docs available at http://localhost:${port}/docs`);
	});
}

exports.swaggerDocs = swaggerDocs;
