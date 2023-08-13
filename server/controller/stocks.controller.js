const yahooFinance = require("yahoo-finance2").default;
const User = require("../models/user.model");

exports.getInfo = async (req, res) => {
	const ticker = req.params.ticker;
	const quote = await yahooFinance.quote(ticker);
	const { regularMarketPrice, regularMarketChangePercent, longName } = quote;

	res.send({
		longName,
		price: regularMarketPrice,
		changePercent: regularMarketChangePercent,
	});
};

// exports.getMultipleHistorical = async (req, res) => {
//   const tickers = req.query.tickers;
//   const period1 = req.query.period1;
//   const interval = req.query.interval;

//   try {

exports.getHistorical = async (req, res) => {
	const ticker = req.params.ticker;
	const period1 = req.query.period1;
	// const period2 = req.query.period2;
	const interval = req.query.interval;

	try {
		const historicalData = await yahooFinance.historical(ticker, {
			period1: period1 || "2020-01-01",
			interval: interval || "1d", // Fetch data every day. 'd' for daily. You can use 'w' for weekly, 'm' for monthly, etc.
		});

		const jsonData = historicalData.map((data) => {
			return [data.date.getTime(), data.close];
		});

		res.send(jsonData);
	} catch (error) {
		console.error("Error fetching " + ticker + " stock data:", error);
		res.status(500).send("Error fetching " + ticker + " stock data:" + error);
	}
};

exports.buyStock = async (req, res) => {
	const ticker = req.params.ticker;
	const quantity = req.body.quantity;

	try {
		const quote = await yahooFinance.quote(ticker);
		const { regularMarketPrice } = quote;

		const user = await User.findById(req.userId);

		if (user.cash < regularMarketPrice * quantity) {
			res.status(400).send({ message: "Not enough cash" });
		} else {
			user.cash -= regularMarketPrice * quantity;
			user.ledger.push({
				ticker: ticker,
				price: regularMarketPrice,
				quantity: quantity,
				type: "buy",
			});
			user.positions.push({
				ticker: ticker,
				quantity: quantity,
				purchasePrice: regularMarketPrice,
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
		console.error("Error fetching " + ticker + " stock data:", error);
		res.status(500).send("Error fetching " + ticker + " stock data:" + error);
	}
};

exports.sellStock = async (req, res) => {
	const ticker = req.params.ticker;
	var quantity = req.body.quantity;

	try {
		const quote = await yahooFinance.quote(ticker);
		const { regularMarketPrice } = quote;

		const user = await User.findById(req.userId);

		// Check if user has enough shares to sell across all positions
		let quantityOwned = 0;
		user.positions.forEach((position) => {
			if (position.ticker === ticker) {
				quantityOwned += position.quantity;
			}
		});

		if (quantityOwned < quantity) {
			res.status(400).send({ message: "Not enough shares" });
			return;
		}

		user.cash += regularMarketPrice * quantity;
		user.ledger.push({
			ticker: ticker,
			price: regularMarketPrice,
			quantity: quantity,
			type: "sell",
		});

		// Sell quantity of shares (decrement for each iteration of the loop) split between all positions of the same ticker
		for (let i = 0; i < user.positions.length; i++) {
			if (user.positions[i].ticker === ticker) {
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
		console.error("Error fetching " + ticker + " stock data:", error);
		res.status(500).send("Error fetching " + ticker + " stock data:" + error);
	}
};
