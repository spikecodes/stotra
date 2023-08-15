import dotenv from "dotenv";
dotenv.config();
const jwtSecret = process.env.STOTA_JWT_SECRET;
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";

import User from "../models/user.model";

const signup = (req: Request, res: Response) => {
	/* 
	#swagger.tags = ['Authentication']
	*/
	if (!req.body.username || !req.body.password) {
		res.status(400).send({ message: "Content can not be empty!" });
		return;
	}

	const user = new User({
		username: req.body.username,
		password: bcrypt.hashSync(req.body.password, 8),
		watchlist: [],
		ledger: [],
		positions: [],
		cash: 100_000,
	});

	user
		.save()
		.then((user: { save: () => Promise<any> }) => {
			if (user) {
				user
					.save()
					.then((user: any) => {
						if (user) {
							res.send({ message: "User was registered successfully!" });
						}
					})
					.catch((err: any) => {
						if (err) {
							res.status(500).send({ message: err });
						}
					});
			}
		})
		.catch((err: any) => {
			res.status(500).send({ message: err });
		});
};

const login = (req: Request, res: Response) => {
	/* 
	#swagger.tags = ['Authentication']
	*/
	User.findOne({
		username: req.body.username,
	})
		.then((user) => {
			if (!user) {
				return res.status(404).send({ message: "User Not found." });
			}

			var passwordIsValid = bcrypt.compareSync(
				req.body.password,
				user.password,
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
				expiresIn: 86400, // 24 hours
			});
			res.status(200).send({
				id: user._id,
				username: user.username,
				accessToken: token,
			});
		})
		.catch((err: any) => {
			res.status(500).send({ message: err });
		});
};

export default { signup, login };
