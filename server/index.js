const path = require("path");
const morgan = require("morgan"); //import morgan
const { log } = require("mercedlogger"); // import mercedlogger's log function
const cors = require("cors");
const rateLimit = require("express-rate-limit").rateLimit;
const { createHandler } = require("graphql-http/lib/use/express");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3010;

const Database = require("./utils/db");
const UserSchema = require("./models/user.model");

// Middleware
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

// Ratelimiting
const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// const loginLimiter = rateLimit({
//   windowMs: 30 * 60 * 1000, // Half hour
//   max: 10, // Limit each IP to 10 login requests per `window` (here, per half hour)
//   message:
//     "Too many login attempts from this IP, please try again after an hour",
//   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// });

const createAccountLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 5, // Limit each IP to 5 create account requests per `window` (here, per hour)
	message:
		"Too many accounts created from this IP, please try again after an hour",
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// app.use("/api/", apiLimiter);
// app.use("/api/auth/login", loginLimiter);
app.use("/api/auth/signup", createAccountLimiter);

// GraphQL API
const schema = require("./models/stocks.graphql");
app.all("/graphql", createHandler({ schema }));

// REST Routes
app.use(require("./routes"));

app.listen(PORT, async () => {
	console.log(`Example app listening at http://localhost:${PORT}`);
});
