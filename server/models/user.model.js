const mongoose = require("mongoose");

const User = mongoose.model(
	"User",
	new mongoose.Schema({
		username: String,
		password: String,
		ledger: Array,
		cash: Number,
	}),
);

module.exports = User;
