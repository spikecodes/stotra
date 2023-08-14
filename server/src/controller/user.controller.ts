import Position from "../models/position.model";
import User, { IUser } from "../models/user.model";
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
	let user: IUser | null = await User.findById(req.body.userId).lean();
	if (!user) {
		res.status(500).send({ message: "User not found" });
	}
	user = user!;

	let portfolioValue = 0; //user.cash
	let portfolioPrevCloseValue = 0;

	// Create array of how many of each symbol (no duplicates)
	let positionsNoDupes: { [key: string]: number } = {};
	user!.positions.forEach((position) => {
		if (positionsNoDupes[position.symbol]) {
			positionsNoDupes[position.symbol] += position.quantity;
		} else {
			positionsNoDupes[position.symbol] = position.quantity;
		}
	});

	const symbols = Object.keys(positionsNoDupes);
	const quantities = Object.values(positionsNoDupes);

	// Loop through each symbol and fetch current price
	Promise.all(symbols.map((symbol) => fetchStockData(symbol)))
		.then((values) => {
			var listOfPositions: any[] = [];

			// Sum up the value of all positions
			values.map((value, i) => {
				// Sum up the value of all positions
				portfolioValue += value.regularMarketPrice * quantities[i];
				portfolioPrevCloseValue +=
					value.regularMarketPreviousClose * quantities[i];
			});

			// Create list of positions to send to frontend with data from user.positions plus the properties from the fetchStockData response
			user!.positions.forEach((position) => {
				const positionLiveData = values.find(
					(value) => value.symbol === position.symbol,
				);
				if (positionLiveData) {
					listOfPositions.push({
						...position,
						...positionLiveData,
					});
				}
			});

			console.log(user?.positions.length);

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
