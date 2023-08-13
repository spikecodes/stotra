const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Transaction = new Schema({
	ticker: {
		type: String,
		required: true,
		uppercase: true, // Ensure tickers are stored in uppercase
		trim: true, // Remove any potential whitespace
	},
	price: {
		type: Number,
		required: true,
		min: 0, // The price should not be negative
	},
	quantity: {
		type: Number,
		required: true,
		min: 1, // Minimum of 1 share
	},
	type: {
		type: String,
		required: true,
		enum: ["buy", "sell"],
	},
	date: {
		type: Date,
		default: Date.now, // Default to current date/time
	},
});

module.exports = Transaction;
