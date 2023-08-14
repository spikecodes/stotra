import Position from "../models/position.model";
import User from "../models/user.model";
import { Request, Response } from "express";
import { fetchStockData } from "../utils/requests";

const allAccess = (req: Request, res: Response) => {
	res.status(200).send("Public Content.");
};

const getLedger = (req: Request, res: Response) => {
	User.findById(req.body.userId)
		.then((user) => {
			res.status(200).send({ ledger: user!.ledger });
		})
		.catch((err: { message: any }) => {
			res.status(500).send({ message: err.message });
		});
};

const getHoldings = (req: Request, res: Response) => {
	User.findById(req.body.userId)
		.then((user) => {
			res.status(200).send({ positions: user!.positions, cash: user!.cash });
		})
		.catch((err: { message: any }) => {
			res.status(500).send({ message: err.message });
		});
};

const getPortfolio = async (req: Request, res: Response) => {
	let user = await User.findById(req.body.userId);
	user = user!;
	if (!user) {
		res.status(500).send({ message: "User not found" });
	}

	let portfolioValue = 0; //user.cash
	let portfolioPrevCloseValue = 0;

	// Create array of how many of each symbol (no duplicates)
	let positionsNoDupes = user.positions.reduce(
		(
			acc: { [x: string]: any },
			position: { symbol: string | number; quantity: any },
		) => {
			if (!acc[position.symbol]) {
				acc[position.symbol] = position.quantity;
			} else {
				acc[position.symbol] += position.quantity;
			}
			return acc;
		},
		{},
	);

	// Loop through each symbol and fetch current price
	Promise.all(
		Object.keys(positionsNoDupes).map((symbol) => fetchStockData(symbol)),
	)
		.then((values) => {
			var listOfPositions: any[] = [];

			// Sum up the value of all positions
			values.map((value, i) => {
				// Sum up the value of all positions
				portfolioValue +=
					value.regularMarketPrice * Object.values(positionsNoDupes)[i];
				portfolioPrevCloseValue +=
					value.regularMarketPreviousClose * Object.values(positionsNoDupes)[i];

				// Add each user.positions to listOfPositions
				user!.positions.forEach((position) => {
					listOfPositions.push({
						...position,
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

export default { allAccess, getLedger, getHoldings, getPortfolio };
