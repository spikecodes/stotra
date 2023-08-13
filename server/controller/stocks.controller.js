const yahooFinance = require("yahoo-finance2").default;

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
