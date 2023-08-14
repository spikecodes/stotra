import mongoose from "mongoose";
import Transaction from "./transaction.model";
import Position from "./position.model";

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
		ledger: [Transaction],
		positions: [Position],
		cash: Number,
	}),
);

export default User;
