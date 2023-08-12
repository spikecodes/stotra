import axios from "axios";
import Cookie from "js-cookie";

class Auth {
	constructor() {
		if (Auth.instance) {
			return Auth.instance;
		}

		Auth.instance = this;
		return this;
	}

	storeLoginData(jwt, username) {
		// Store jwt and username in localStorage
		localStorage.setItem("jwt", jwt);
		localStorage.setItem("username", username);
	}

	getUsername() {
		return localStorage.getItem("username");
	}

	getToken() {
		return localStorage.getItem("jwt");
	}

	isAuthenticated() {
		// Check if jwt and username are stored in localStorage
		return localStorage.getItem("jwt") && localStorage.getItem("username");
	}

	async signup(username, password) {
		try {
			const res = await axios.post("http://localhost:3010/api/auth/signup", {
				username,
				password,
			});
			return "success";
		} catch (err) {
			return err.response.data.message;
		}
	}

	login(username, password) {
		return axios
			.post("http://localhost:3010/api/auth/login", { username, password })
			.then((res) => {
				console.log(res);
				if (res.data.accessToken !== undefined) {
					this.username = username;
					this.jwt = res.data.accessToken;
					this.storeLoginData(res.data.accessToken, username);
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

	logout() {
		// Clear jwt and username from state
		this.username = null;
		this.jwt = null;
		// Clear jwt and username from localStorage
		localStorage.removeItem("jwt");
		localStorage.removeItem("username");
	}
}

const authInstance = new Auth();
export default authInstance;
