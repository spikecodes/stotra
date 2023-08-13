const User = require("../models/user.model");

exports.allAccess = (req, res) => {
	res.status(200).send("Public Content.");
};

exports.getLedger = (req, res) => {
	User.findById(req.userId)
		.then((user) => {
			res.status(200).send({ ledger: user.ledger });
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};

exports.getHoldings = (req, res) => {
	User.findById(req.userId)
		.then((user) => {
			res.status(200).send({ positions: user.positions, cash: user.cash });
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};

exports.buyStock = (req, res) => {
	User.findById(req.userId)
		.then((user) => {
			if (user.cash < req.body.price * req.body.quantity) {
				res.status(500).send({ message: "Not enough cash" });
			} else {
				user.cash -= req.body.price * req.body.quantity;
				user.ledger.push({
					ticker: req.body.ticker,
					price: req.body.price,
					quantity: req.body.quantity,
					type: "buy",
				});

				user
					.save()
					.then((user) => {
						if (user) {
							res.send({ message: "Stock was bought successfully!" });
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
			res.status(500).send({ message: err.message });
		});
};

exports.userBoard = (req, res) => {
	console.log(req.userId);
	res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
	res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
	res.status(200).send("Moderator Content.");
};
