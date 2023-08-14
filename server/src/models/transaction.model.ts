import { Schema, Document, model } from "mongoose";

export interface ITransaction extends Document {
	symbol: string;
	price: number;
	quantity: number;
	type: string;
	date: number;
}

export const TransactionSchema = new Schema<ITransaction>({
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
		type: Number,
		default: Date.now, // Default to current date/time
	},
});

const Transaction = model<ITransaction>("Transaction", TransactionSchema);

export default Transaction;
