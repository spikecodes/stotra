import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerAutogen from "swagger-autogen";
import { version } from "../../package.json";
import dotenv from "dotenv";
dotenv.config();

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
		host: "0.0.0.0:" + port,
		securityDefinitions: {
			bearerAuth: {
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT",
			},
		},
		servers: [
			{ url: process.env.STOTRA_SERVER_URL || `http://0.0.0.0:${port}` },
		],
	};

	const autogen = swaggerAutogen({
		openapi: "3.0.0",
		servers: [{ url: "/x" }],
	})(outputFile, endpointsFiles, doc).then(() => {
		const swaggerDocument = require("." + outputFile);
		app.use(
			"/api/docs",
			swaggerUi.serve,
			swaggerUi.setup(swaggerDocument, {
				swaggerOptions: { persistAuthorization: true },
			}),
		);
		console.log(`Swagger docs available at http://0.0.0.0:${port}/api/docs`);
	});
}

exports.swaggerDocs = swaggerDocs;
