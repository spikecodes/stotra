function getUsername(): string | null {
	return localStorage.getItem("username");
}

function getToken(): string | null {
	return localStorage.getItem("jwt");
}

function isAuthenticated(): boolean {
	// Check if jwt and username are stored in localStorage
	return (
		localStorage.getItem("jwt") !== null &&
		localStorage.getItem("username") !== null
	);
}

function setTokenAndUsername(accessToken: string, username: string): void {
	localStorage.setItem("jwt", accessToken);
	localStorage.setItem("username", username);
}

function clearToken(): void {
	// Clear jwt and username from localStorage
	localStorage.removeItem("jwt");
	localStorage.removeItem("username");
}

export default {
	getUsername,
	getToken,
	isAuthenticated,
	setTokenAndUsername,
	clearToken,
};
