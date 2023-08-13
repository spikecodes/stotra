const { verifySignUp } = require("../middleware");
const controller = require("../controller/auth.controller");

module.exports = function (app) {
	app.post(
		"/api/auth/signup",
		[verifySignUp.checkDuplicateUsername],
		controller.signup,
	);

	app.post("/api/auth/login", controller.login);
};
