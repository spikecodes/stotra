import yahooFinance from "yahoo-finance2";
import Cache from "node-cache";
import axios from "axios";
const stockCache = new Cache({ stdTTL: 60 }); // 1 minute

import dotenv from "dotenv";
dotenv.config();

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
	} catch (err: any) {
		if (err.result && Array.isArray(err.result)) {
			let quote = err.result[0];

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
		} else {
			console.error(err);
			console.error("Error fetching " + symbol + " stock data:", err);
			throw new Error(err);
		}
	}
};

export const fetchHistoricalStockData = async (
	symbol: string,
	period: "1d" | "5d" | "1m" | "6m" | "YTD" | "1y" | "all" = "1d",
): Promise<any> => {
	const periodTerm =
		period === "1d" || period === "5d" || period === "1m" ? "short" : "long";
	const cacheKey = symbol + "-historical-" + periodTerm;

	try {
		if (stockCache.has(cacheKey)) {
			return stockCache.get(cacheKey);
		} else {
			let formattedData: number[][] = [];

			if (periodTerm == "short") {
				// If the period is less than 1 month, use intraday data from Alpha Vantage
				let res = await axios.get(
					"https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" +
						symbol +
						"&interval=15min&extended_hours=true&outputsize=full&apikey=" +
						process.env.STOTRA_ALPHAVANTAGE_API,
				);
				const alphaData = res.data["Time Series (15min)"];

				if (!alphaData) {
					return fetchHistoricalStockData(symbol, "6m");
				}

				formattedData = Object.keys(alphaData)
					.map((key) => {
						return [
							new Date(key).getTime(),
							parseFloat(alphaData[key]["4. close"]),
						];
					})
					.sort((a, b) => a[0] - b[0]);
			} else {
				const yahooData = await yahooFinance.historical(symbol, {
					period1: "2000-01-01",
					interval: "1d",
				});

				formattedData = yahooData.map(
					(data: { date: { getTime: () => any }; close: any }) => {
						return [data.date.getTime(), data.close];
					},
				);
			}
			stockCache.set(cacheKey, formattedData);
			return formattedData;
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
