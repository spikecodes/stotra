import { Position } from "./App";
import axios from "axios";

class Accounts {
	static instance: Accounts;

	constructor() {
		if (Accounts.instance) {
			return Accounts.instance;
		}

		Accounts.instance = this;
		return this;
	}

	makeTransaction(
		symbol: string,
		quantity: number,
		type: "buy" | "sell",
	): Promise<string> {
		return axios
			.post(
				"http://localhost:3010/api/stocks/" + symbol + "/" + type,
				{
					quantity,
				},
				{
					headers: { Authorization: `Bearer ${this.getToken()}` },
				},
			)
			.then((res) => {
				return res.data.message;
			})
			.catch((err) => {
				console.log(err.response.data.message);
				throw new Error(err.response.data.message);
			});
	}

	getUsername(): string | null {
		return localStorage.getItem("username");
	}

	getToken(): string | null {
		return localStorage.getItem("jwt");
	}

	getPositions(): Promise<Position[]> {
		return axios
			.get("http://localhost:3010/api/user/holdings", {
				headers: { Authorization: `Bearer ${this.getToken()}` },
			})
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

	getWatchlist(raw: boolean): Promise<any[]> {
		return axios
			.get("http://localhost:3010/api/user/watchlist", {
				data: { raw },
				headers: { Authorization: `Bearer ${this.getToken()}` },
			})
			.then((res) => {
				return res.data.watchlist;
			})
			.catch((err) => {
				if (err.response) {
					throw new Error(err.response.data.message);
				} else {
					throw new Error(err as string);
				}
			});
	}

	editWatchlist(symbol: string, operation: "add" | "remove"): Promise<string> {
		return axios
			.post(
				"http://localhost:3010/api/user/watchlist/" + operation + "/" + symbol,
				{},
				{
					headers: { Authorization: `Bearer ${this.getToken()}` },
				},
			)
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

	getPortfolio(): Promise<{
		portfolioValue: number;
		portfolioPrevCloseValue: number;
		positions: Position[];
	}> {
		return axios
			.get("http://localhost:3010/api/user/portfolio", {
				headers: { Authorization: `Bearer ${this.getToken()}` },
			})
			.then((res) => {
				return {
					portfolioValue: res.data.portfolioValue,
					portfolioPrevCloseValue: res.data.portfolioPrevCloseValue,
					positions: res.data.positions,
				};
			})
			.catch((err) => {
				if (err.response) {
					throw new Error(err.response.data.message);
				} else {
					throw new Error(err as string);
				}
			});
	}

	getBuyingPower(): Promise<number> {
		return axios
			.get("http://localhost:3010/api/user/holdings", {
				headers: { Authorization: `Bearer ${this.getToken()}` },
			})
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

	getAvailableShares(symbol: string): Promise<number> {
		return axios
			.get("http://localhost:3010/api/user/holdings", {
				headers: { Authorization: `Bearer ${this.getToken()}` },
			})
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

	isAuthenticated(): boolean {
		// Check if jwt and username are stored in localStorage
		return (
			localStorage.getItem("jwt") !== null &&
			localStorage.getItem("username") !== null
		);
	}

	signup(username: string, password: string): Promise<string> {
		return axios
			.post("http://localhost:3010/api/auth/signup", {
				username,
				password,
			})
			.then((_) => {
				return "success";
			})
			.catch((err) => {
				throw new Error(err.response.data.message);
			});
	}

	login(username: string, password: any): Promise<string> {
		return axios
			.post("http://localhost:3010/api/auth/login", { username, password })
			.then((res) => {
				if (res.data.accessToken !== undefined) {
					// Store jwt and username in localStorage
					localStorage.setItem("jwt", res.data.accessToken);
					localStorage.setItem("username", username);
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

	logout(): void {
		// Clear jwt and username from localStorage
		localStorage.removeItem("jwt");
		localStorage.removeItem("username");
	}
}

const authInstance = new Accounts();
export default authInstance;
