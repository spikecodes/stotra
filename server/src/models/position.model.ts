import { Schema, Document, model } from "mongoose";

export interface IPosition extends Document {
	symbol: string;
	purchasePrice: number;
	purchaseDate: number;
	quantity: number;
	_doc: any;
}

export const PositionSchema = new Schema<IPosition>({
	symbol: {
		type: String,
		required: true,
		uppercase: true, // Ensure symbols are stored in uppercase
		trim: true, // Remove any potential whitespace
	},
	purchasePrice: {
		type: Number,
		required: true,
		min: 0, // The price should not be negative
	},
	purchaseDate: {
		type: Number,
		default: Date.now, // Default to current date/time
	},
	quantity: {
		type: Number,
		required: true,
		min: 1, // Minimum of 1 share
	},
});

// 3. Create a Model.
const Position = model<IPosition>("Position", PositionSchema);

export default Position;
