require("dotenv").config();
const jwtSecret = process.env.STOTA_JWT_SECRET;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const User = require("../models/user.model");

exports.signup = (req, res) => {
	if (!req.body.username || !req.body.password) {
		res.status(400).send({ message: "Content can not be empty!" });
		return;
	}

	const user = new User({
		username: req.body.username,
		password: bcrypt.hashSync(req.body.password, 8),
		ledger: [],
		positions: [],
		cash: 100_000,
	});

	user
		.save()
		.then((user) => {
			if (user) {
				user
					.save()
					.then((user) => {
						if (user) {
							res.send({ message: "User was registered successfully!" });
						}
					})
					.catch((err) => {
						if (err) {
							res.status(500).send({ message: err });
						}
					});
			}
		})
		.catch((err) => {
			console.log("bagg" + err);
			res.status(500).send({ message: err });
		});
};

exports.login = (req, res) => {
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

			const token = jwt.sign({ id: user.id }, jwtSecret, {
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
		.catch((err) => {
			res.status(500).send({ message: err });
		});
};
