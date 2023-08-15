import yahooFinance from "yahoo-finance2";
import Cache from "node-cache";
const stockCache = new Cache({ stdTTL: 5 }); // 5 seconds

export const fetchStockData = async (symbol: string): Promise<any> => {
	const cacheKey = symbol + "-quote";

	try {
		if (stockCache.has(cacheKey)) {
			return stockCache.get(cacheKey);
		} else {
			const quote = await yahooFinance.quoteCombine(symbol, {
				fields: [
					"regularMarketPrice",
					"regularMarketChangePercent",
					"longName",
					"regularMarketPreviousClose",
				],
			});

			const {
				regularMarketPrice,
				regularMarketChangePercent,
				longName,
				regularMarketPreviousClose,
			} = quote;

			const stockData = {
				symbol,
				longName,
				regularMarketPrice,
				regularMarketPreviousClose,
				regularMarketChangePercent,
			};

			stockCache.set(cacheKey, stockData);
			return stockData;
		}
	} catch (error) {
		console.error("Error fetching " + symbol + " stock data:", error);
		return null;
	}
};

export const fetchHistoricalStockData = async (
	symbol: string,
	period1: string = "2015-01-01",
	interval: "1d" | "1wk" | "1mo" = "1d",
): Promise<any> => {
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

export const searchStocks = async (query: string): Promise<any> => {
	const queryOptions = {
		newsCount: 0,
		enableFuzzyQuery: true,
		enableNavLinks: false,
		enableCb: false,
		enableEnhancedTrivialQuery: false,
	};

	return yahooFinance
		.search(query, queryOptions)
		.then((results) => {
			return results.quotes;
		})
		.catch((err) => {
			if (err.result && Array.isArray(err.result.quotes)) {
				return err.result.quotes;
			} else {
				console.error(err);
				throw new Error(err);
			}
		});
};
