import dotenv from "dotenv";
dotenv.config();
const jwtSecret = process.env.STOTRA_JWT_SECRET;
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";

import User from "../models/user.model";
import axios from "axios";

const signup = (req: Request, res: Response) => {
	/* 
	#swagger.tags = ['Authentication']
	*/
	if (!req.body.username || !req.body.password) {
		res.status(400).send({ message: "Content can not be empty!" });
		return;
	}

	validateTurnstile(req.body["cf-turnstile-response"])
		.then((_) => {
			const newUser = new User({
				username: req.body.username,
				password: bcrypt.hashSync(req.body.password, 8),
				watchlist: [],
				ledger: [],
				positions: [],
				cash: 100_000,
			});

			newUser
				.save()
				.then((user: { save: () => Promise<any> }) => {
					if (user) {
						user
							.save()
							.then(() => {
								res.send({ message: "User was registered successfully!" });
							})
							.catch((err: Error) => {
								res.status(500).send({ message: err.message });
							});
					}
				})
				.catch((err: any) => {
					res.status(500).send({ message: err });
				});
		})
		.catch((err: Error) => {
			res.status(500).send({ message: err.message });
		});
};

const login = (req: Request, res: Response) => {
	/* 
	#swagger.tags = ['Authentication']
	*/
	validateTurnstile(req.body["cf-turnstile-response"])
		.then((_) => {
			User.findOne({
				username: req.body.username,
			})
				.then((user) => {
					if (!user) {
						return res.status(404).send({ message: "User Not found." });
					}

					var passwordIsValid = bcrypt.compareSync(
						req.body.password,
						user.password
					);

					if (!passwordIsValid) {
						return res.status(401).send({
							accessToken: null,
							message: "Incorret password",
						});
					}

					const token = jwt.sign({ id: user.id }, jwtSecret!, {
						algorithm: "HS256",
						allowInsecureKeySizes: true,
						expiresIn: "7 days",
					});
					res.status(200).send({
						id: user._id,
						username: user.username,
						accessToken: token,
					});
				})
				.catch((err: Error) => {
					res.status(500).send({ message: err.message });
				});
		})
		.catch((err: Error) => {
			res.status(400).send({ message: err.message });
			return;
		});
};

const validateTurnstile = async (token: string): Promise<any> => {
	/*
	#swagger.tags = ['Authentication']
	*/
	let secret = process.env.STOTRA_TURNSTILE_SECRET;

	if (!secret) {
		throw new Error("Turnstile secret not found");
	}

	let res = await axios
		.post("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
			secret: process.env.STOTRA_TURNSTILE_SECRET,
			response: token,
		})
		.catch((err) => {
			throw new Error(err);
		});

	if (res.data.success) {
		return true;
	} else {
		throw new Error(
			"Can't validate turnstile token: " + res.data["error-codes"]
		);
	}
};

export default { signup, login };
