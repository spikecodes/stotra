import yahooFinance from "yahoo-finance2";
import { Request, Response } from "express";
import { SearchOptions } from "yahoo-finance2/dist/esm/src/modules/search";

import dotenv from "dotenv";
dotenv.config();

const { SearchApi } = require("financial-news-api");
const searchApi = SearchApi(process.env.STOTRA_NEWSFILTER_API);

// Cache the results for 15 minutes
import NodeCache from "node-cache";
const cache = new NodeCache({ stdTTL: 15 * 60 });

const getNews = async (req: Request, res: Response) => {
	/* 
	#swagger.tags = ['News']
	*/
	var symbol = req.params.symbol || "";
	const symbolQuery = symbol !== "" ? "symbols:" + symbol + " AND " : "";

	if (cache.has(symbol + "-news")) {
		res.status(200).json(cache.get(symbol + "-news"));
		return;
	}

	// If no API key for NewsFilter is provided, use Yahoo Finance API
	if (
		process.env.STOTRA_NEWSFILTER_API === undefined ||
		process.env.STOTRA_NEWSFILTER_API === ""
	) {
		console.warn("No NewsFilter API key provided. Using Yahoo Finance API.");
		yahooNews(symbol)
			.then((news) => {
				res.status(200).json(news);
			})
			.catch((err: any) => {
				console.log(err);
				res.status(500).json(err);
			});
		return;
	}

	const query = {
		queryString:
			symbolQuery +
			"(source.id:bloomberg OR source.id:reuters OR source.id:cnbc OR source.id:wall-street-journal)",
		from: 0,
		size: 10,
	};

	searchApi
		.getNews(query)
		.then((response: any) => {
			let news = response.articles.map((newsItem: any) => {
				return {
					title: newsItem.title,
					publishedAt: newsItem.publishedAt,
					source: newsItem.source.name,
					sourceUrl: newsItem.sourceUrl,
					symbols: newsItem.symbols,
					description: newsItem.description,
				};
			});
			cache.set(symbol + "-news", news);
			res.status(200).json(news);
		})
		.catch((err: any) => {
			if (err.response && err.response.data && err.response.data.message) {
				// Retry with Yahoo Finance API if Newsfilter quota is exceeded
				yahooNews(symbol)
					.then((news) => {
						res.status(200).json(news);
					})
					.catch((err: any) => {
						console.log(err);
						res.status(500).json(err);
					});
			} else {
				console.log(err);
				res.status(500).json(err);
			}
		});
};

function yahooNews(symbol: string): Promise<any> {
	const options: SearchOptions = {
		quotesCount: 0,
		newsCount: 10,
	};

	if (symbol === "") {
		symbol = "stock";
	}

	return yahooFinance
		.search(symbol || "", options)
		.then((response: any) => {
			let news = response.news.map((newsItem: any) => {
				return {
					title: newsItem.title,
					publishedAt: newsItem.providerPublishTime,
					source: newsItem.publisher,
					sourceUrl: newsItem.link,
					symbols: newsItem.relatedTickers || [],
					description: "",
				};
			});

			cache.set(symbol + "-news", news);
			return news;
		})
		.catch((err: any) => {
			console.log(err);
			throw new Error(err);
		});
}

export default { getNews };
