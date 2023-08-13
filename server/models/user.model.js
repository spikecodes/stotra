const mongoose = require("mongoose");
const Position = require("./position.model");

const User = mongoose.model(
	"User",
	new mongoose.Schema({
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		ledger: Array,
		positions: [Position],
		cash: Number,
	}),
);

module.exports = User;
