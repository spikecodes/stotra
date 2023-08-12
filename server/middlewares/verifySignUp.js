const User = require("../models/user.model");

checkDuplicateUsername = (req, res, next) => {
	// Username
	User.findOne({
		username: req.body.username,
	})
		.then((user) => {
			if (user) {
				res.status(400).send({ message: "Username is already in use" });
				return;
			}
			next();
		})
		.catch((err) => {
			console.log("err", err);
			res.status(500).send({ message: err });
		});
};

const verifySignUp = {
	checkDuplicateUsername,
};

module.exports = verifySignUp;
