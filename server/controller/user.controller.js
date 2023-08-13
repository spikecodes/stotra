const yahooFinance = require("yahoo-finance2").default;
const Position = require("../models/position.model");
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

exports.getPortfolioValue = async (req, res) => {
	let user = await User.findById(req.userId);
	if (!user) {
		res.status(500).send({ message: "User not found" });
	}

	let portfolioValue = 0; //user.cash
	let portfolioPrevCloseValue = 0;

	// Create array of how many of each ticker (no duplicates)
	let positionsNoDupes = user.positions.reduce((acc, position) => {
		if (!acc[position.ticker]) {
			acc[position.ticker] = position.quantity;
		} else {
			acc[position.ticker] += position.quantity;
		}
		return acc;
	}, {});

	let promises = [];

	// Loop through each ticker and fetch current price
	for (let ticker in positionsNoDupes) {
		promises.push(yahooFinance.quote(ticker));
	}

	Promise.all(promises)
		.then((values) => {
			// Sum up the value of all positions
			for (let i = 0; i < values.length; i++) {
				portfolioValue +=
					values[i].regularMarketPrice * Object.values(positionsNoDupes)[i];
				portfolioPrevCloseValue +=
					values[i].regularMarketPreviousClose *
					Object.values(positionsNoDupes)[i];
			}

			res.status(200).send({ portfolioValue, portfolioPrevCloseValue });
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};
