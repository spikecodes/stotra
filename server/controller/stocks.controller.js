const User = require("../models/user.model");

const {
	fetchStockData,
	fetchHistoricalStockData,
} = require("../utils/requests");

exports.getInfo = async (req, res) => {
	const symbol = req.params.symbol;
	const quote = await fetchStockData(symbol);
	res.status(200).send(quote);
};

exports.getHistorical = async (req, res) => {
	const symbol = req.params.symbol;
	const period1 = req.query.period1;
	// const period2 = req.query.period2;
	const interval = req.query.interval;

	try {
		const historicalData = await fetchHistoricalStockData(
			symbol,
			period1,
			interval,
		);

		const jsonData = historicalData.map((data) => {
			return [data.date.getTime(), data.close];
		});

		res.send(jsonData);
	} catch (error) {
		console.error("Error fetching " + symbol + " stock data:", error);
		res.status(500).send("Error fetching " + symbol + " stock data:" + error);
	}
};

exports.buyStock = async (req, res) => {
	const symbol = req.params.symbol;
	const quantity = req.body.quantity;

	try {
		const data = await fetchStockData(symbol);
		const price = data.regularMarketPrice;

		const user = await User.findById(req.userId);

		if (user.cash < price * quantity) {
			res.status(400).send({ message: "Not enough cash" });
		} else {
			user.cash -= price * quantity;
			user.ledger.push({
				symbol: symbol,
				price,
				quantity: quantity,
				type: "buy",
			});
			user.positions.push({
				symbol: symbol,
				quantity: quantity,
				purchasePrice: price,
				purchaseDate: Date.now(),
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
	} catch (error) {
		console.error("Error fetching " + symbol + " stock data:", error);
		res.status(500).send("Error fetching " + symbol + " stock data:" + error);
	}
};

exports.sellStock = async (req, res) => {
	const symbol = req.params.symbol;
	var quantity = req.body.quantity;

	try {
		const { price } = await fetchStockData(symbol);

		const user = await User.findById(req.userId);

		// Check if user has enough shares to sell across all positions
		let quantityOwned = 0;
		user.positions.forEach((position) => {
			if (position.symbol === symbol) {
				quantityOwned += position.quantity;
			}
		});

		if (quantityOwned < quantity) {
			res.status(400).send({ message: "Not enough shares" });
			return;
		}

		user.cash += price * quantity;
		user.ledger.push({
			symbol: symbol,
			price: price,
			quantity: quantity,
			type: "sell",
		});

		// Sell quantity of shares (decrement for each iteration of the loop) split between all positions of the same symbol
		for (let i = 0; i < user.positions.length; i++) {
			if (user.positions[i].symbol === symbol) {
				if (user.positions[i].quantity > quantity) {
					user.positions[i].quantity -= quantity;
					break;
				} else {
					quantity -= user.positions[i].quantity;
					user.positions.splice(i, 1);
					i--;
				}
			}
		}

		user
			.save()
			.then((user) => {
				if (user) {
					res.send({ message: "Stock was sold successfully!" });
				}
			})
			.catch((err) => {
				if (err) {
					res.status(500).send({ message: err });
				}
			});
	} catch (error) {
		console.error("Error fetching " + symbol + " stock data:", error);
		res.status(500).send("Error fetching " + symbol + " stock data:" + error);
	}
};
