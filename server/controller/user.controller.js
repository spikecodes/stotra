const yahooFinance = require("yahoo-finance2").default;
const Position = require("../models/position.model");
const User = require("../models/user.model");
const {
	fetchStockData,
	fetchHistoricalStockData,
} = require("../utils/requests");

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

	// Create array of how many of each symbol (no duplicates)
	let positionsNoDupes = user.positions.reduce((acc, position) => {
		if (!acc[position.symbol]) {
			acc[position.symbol] = position.quantity;
		} else {
			acc[position.symbol] += position.quantity;
		}
		return acc;
	}, {});

	let promises = [];

	// Loop through each symbol and fetch current price
	for (let symbol in positionsNoDupes) {
		promises.push(fetchStockData(symbol));
	}

	Promise.all(promises)
		.then((values) => {
			// Sum up the value of all positions
			for (let i = 0; i < values.length; i++) {
				portfolioValue += values[i].price * Object.values(positionsNoDupes)[i];
				portfolioPrevCloseValue +=
					values[i].prevClose * Object.values(positionsNoDupes)[i];
			}

			res.status(200).send({ portfolioValue, portfolioPrevCloseValue });
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};
