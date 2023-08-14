import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";

const checkDuplicateUsername = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// Username
	User.findOne({
		username: req.body.username,
	})
		.then((user) => {
			if (user) {
				res.status(400).send({ message: "Username is already in use" });
				return;
			}
			next();
		})
		.catch((err) => {
			console.log("err", err);
			res.status(500).send({ message: err });
		});
};

const verifySignUp = {
	checkDuplicateUsername,
};

export default verifySignUp;
