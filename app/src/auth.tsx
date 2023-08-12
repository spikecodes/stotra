import axios from "axios";

class Auth {
	static instance: Auth;

	constructor() {
		if (Auth.instance) {
			return Auth.instance;
		}

		Auth.instance = this;
		return this;
	}

	getUsername(): string | null {
		return localStorage.getItem("username");
	}

	getToken(): string | null {
		return localStorage.getItem("jwt");
	}

	isAuthenticated(): boolean {
		// Check if jwt and username are stored in localStorage
		return (
			localStorage.getItem("jwt") !== null &&
			localStorage.getItem("username") !== null
		);
	}

	async signup(username: string, password: string): Promise<string> {
		try {
			await axios.post("http://localhost:3010/api/auth/signup", {
				username,
				password,
			});
			return "success";
		} catch (err: any) {
			return err.response.data.message;
		}
	}

	login(username: string, password: any): Promise<string> {
		return axios
			.post("http://localhost:3010/api/auth/login", { username, password })
			.then((res) => {
				console.log(res);
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
				console.log(err);
				return err.response
					? err.response.data.message
					: "Could not connect to server.";
			});
	}

	logout(): void {
		// Clear jwt and username from localStorage
		localStorage.removeItem("jwt");
		localStorage.removeItem("username");
	}
}

const authInstance = new Auth();
export default authInstance;
