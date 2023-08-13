const yahooFinance = require("yahoo-finance2").default;
const Cache = require("node-cache");
const stockCache = new Cache({ stdTTL: 60 }); // 1 minute

exports.fetchStockData = async (symbol) => {
	const cacheKey = symbol + "-quote";

	try {
		if (stockCache.has(cacheKey)) {
			return stockCache.get(cacheKey);
		} else {
			const quote = await yahooFinance.quote(symbol);
			const {
				regularMarketPrice,
				regularMarketChangePercent,
				longName,
				regularMarketPreviousClose,
			} = quote;

			const stockData = {
				longName,
				price: regularMarketPrice,
				prevClose: regularMarketPreviousClose,
				changePercent: regularMarketChangePercent,
			};

			stockCache.set(cacheKey, stockData);
			return stockData;
		}
	} catch (error) {
		console.error("Error fetching " + symbol + " stock data:", error);
		return null;
	}
};

exports.fetchHistoricalStockData = async (
	symbol,
	period1 = "2015-01-01",
	interval = "1d",
) => {
	const cacheKey = symbol + "-historical-" + period1 + "-" + interval;

	try {
		if (stockCache.has(cacheKey)) {
			return stockCache.get(cacheKey);
		} else {
			const historicalData = await yahooFinance.historical(symbol, {
				period1,
				interval,
			});

			stockCache.set(cacheKey, historicalData);
			return historicalData;
		}
	} catch (error) {
		console.error("Error fetching " + symbol + " historical data:", error);
		return null;
	}
};
