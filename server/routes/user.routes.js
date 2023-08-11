const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);
};
