const { authJwt } = require("../middleware");
const controller = require("../controller/user.controller");

module.exports = function (app) {
	app.get("/api/test/all", controller.allAccess);

	app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

	app.get("/api/user/ledger", [authJwt.verifyToken], controller.userLedger);
};
