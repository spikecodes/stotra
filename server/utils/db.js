const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

require("dotenv").config();

// Read password from dotenv file
const password = process.env.STOTA_MONGODB_PASSWORD;

const uri =
	"mongodb+srv://" +
	process.env.STOTA_MONGODB_USERNAME +
	":" +
	password +
	"@" +
	process.env.STOTA_MONGODB_CLUSTER +
	"/?authMechanism=DEFAULT&retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
	console.log("Connected to Database");
});

module.exports = db;
