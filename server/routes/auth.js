const User = require("../models/user.model");

// Sign up
exports.signup = (req, res) => {
	User.create(req.body)
		.then((users) => req.json(users))
		.catch((err) => res.json({ err }));
};

// Sign in
exports.login = (req, res) => {
	res.json({ message: "Sign in" });
};
