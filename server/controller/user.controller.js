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

exports.getPortfolio = async (req, res) => {
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

	// Loop through each symbol and fetch current price
	Promise.all(
		Object.keys(positionsNoDupes).map((symbol) => fetchStockData(symbol)),
	)
		.then((values) => {
			var listOfPositions = [];

			// Sum up the value of all positions
			values.map((value, i) => {
				// Sum up the value of all positions
				portfolioValue +=
					value.regularMarketPrice * Object.values(positionsNoDupes)[i];
				portfolioPrevCloseValue +=
					value.regularMarketPreviousClose * Object.values(positionsNoDupes)[i];

				// Add each user.positions to listOfPositions
				user.positions.forEach((position) => {
					listOfPositions.push({
						...position._doc,
						regularMarketPrice: value.regularMarketPrice,
						regularMarketChangePercent: value.regularMarketChangePercent,
						regularMarketPreviousClose: value.regularMarketPreviousClose,
					});
				});
			});

			console.log("listOfPositions", listOfPositions);
			res.status(200).send({
				portfolioValue,
				portfolioPrevCloseValue,
				positions: listOfPositions,
			});
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};
