const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.post(
    "/api/auth/signup",
    [verifySignUp.checkDuplicateUsername],
    controller.signup
  );

  app.post("/api/auth/login", controller.login);
};
