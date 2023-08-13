const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Position = new Schema({
	ticker: {
		type: String,
		required: true,
		uppercase: true, // Ensure tickers are stored in uppercase
		trim: true, // Remove any potential whitespace
	},
	purchasePrice: {
		type: Number,
		required: true,
		min: 0, // The price should not be negative
	},
	purchaseDate: {
		type: Date,
		default: Date.now, // Default to current date/time
	},
	quantity: {
		type: Number,
		required: true,
		min: 1, // Minimum of 1 share
	},
});

module.exports = Position;
