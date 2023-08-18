import { Position } from "../App";
import api from "./api.service";
import tokens from "./tokens.service";

function makeTransaction(
	symbol: string,
	quantity: number,
	type: "buy" | "sell",
): Promise<string> {
	return api
		.post("/stocks/" + symbol + "/" + type, {
			quantity,
		})
		.then((res) => {
			return res.data.message;
		})
		.catch((err) => {
			console.log(err.response.data.message);
			throw new Error(err.response.data.message);
		});
}

function getPositions(): Promise<Position[]> {
	return api
		.get("/user/holdings")
		.then((res) => {
			return res.data.positions;
		})
		.catch((err) => {
			console.log(err);
			if (err.response) {
				throw new Error(err.response.data.message);
			} else {
				throw new Error(err as string);
			}
		});
}

function getWatchlist(raw: boolean): Promise<any[]> {
	return api
		.get("/user/watchlist", {
			data: { raw },
		})
		.then((res) => {
			return res.data.watchlist;
		});
}

function editWatchlist(
	symbol: string,
	operation: "add" | "remove",
): Promise<string> {
	return api
		.post("/user/watchlist/" + operation + "/" + symbol, {})
		.then((res) => {
			return res.data.message;
		})
		.catch((err) => {
			if (err.response) {
				throw new Error(err.response.data.message);
			} else {
				throw new Error(err as string);
			}
		});
}

function getPortfolio(): Promise<{
	portfolioValue: number;
	portfolioPrevCloseValue: number;
	positions: Position[];
	cash: number;
}> {
	return api.get("/user/portfolio").then((res) => {
		return {
			portfolioValue: res.data.portfolioValue,
			portfolioPrevCloseValue: res.data.portfolioPrevCloseValue,
			positions: res.data.positions,
			cash: res.data.cash,
		};
	});
}

function getBuyingPower(): Promise<number> {
	return api
		.get("/user/holdings")
		.then((res) => {
			return res.data.cash;
		})
		.catch((err) => {
			if (err.response) {
				throw new Error(err.response.data.message);
			} else {
				throw new Error(err as string);
			}
		});
}

function getAvailableShares(symbol: string): Promise<number> {
	return api
		.get("/user/holdings")
		.then((res) => {
			let positions = res.data.positions;
			// Sum up all the shares of the given symbol
			return positions.reduce((sum: number, stock: Position) => {
				if (stock.symbol === symbol) {
					return sum + stock.quantity;
				}
				return sum;
			}, 0);
		})
		.catch((err) => {
			if (err.response) {
				throw new Error(err.response.data.message);
			} else {
				throw new Error(err as string);
			}
		});
}

function signup(
	username: string,
	password: string,
	turnstileToken: string,
): Promise<string> {
	return api
		.post("/auth/signup", {
			username,
			password,
			"cf-turnstile-response": turnstileToken,
		})
		.then((_) => {
			return "success";
		})
		.catch((err) => {
			throw new Error(err.response.data.message);
		});
}

function login(
	username: string,
	password: string,
	turnstileToken: string,
): Promise<string> {
	return api
		.post("/auth/login", {
			username,
			password,
			"cf-turnstile-response": turnstileToken,
		})
		.then((res) => {
			if (res.data.accessToken !== undefined) {
				// Store jwt and username in localStorage
				tokens.setTokenAndUsername(res.data.accessToken, username);
				return "success";
			} else {
				return "Invalid credentials.";
			}
		})
		.catch((err) => {
			if (err.response) {
				throw new Error(err.response.data.message);
			} else {
				throw new Error(err as string);
			}
		});
}

export default {
	makeTransaction,
	getPositions,
	getWatchlist,
	editWatchlist,
	getPortfolio,
	getBuyingPower,
	getAvailableShares,
	signup,
	login,
};
