import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Transaction = new Schema({
	symbol: {
		type: String,
		required: true,
		uppercase: true, // Ensure symbols are stored in uppercase
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

export default Transaction;
