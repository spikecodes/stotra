const express = require("express");
const router = express.Router();
const { verifySignUp, authJwt } = require("./middleware");
const authController = require("./controller/auth.controller");
const userController = require("./controller/user.controller");
const stocksController = require("./controller/stocks.controller");

// Auth routes
router.post(
	"/api/auth/signup",
	[verifySignUp.checkDuplicateUsername],
	authController.signup,
);
router.post("/api/auth/login", authController.login);

// User data routes
router.get("/api/user/ledger", [authJwt.verifyToken], userController.getLedger);
router.get(
	"/api/user/holdings",
	[authJwt.verifyToken],
	userController.getHoldings,
);
router.get(
	"/api/user/portfolioValue",
	[authJwt.verifyToken],
	userController.getPortfolioValue,
);

// Stocks routes
router.get("/api/stocks/:ticker/info", stocksController.getInfo);
router.get("/api/stocks/:ticker/historical", stocksController.getHistorical);

router.post(
	"/api/stocks/:ticker/buy",
	[authJwt.verifyToken],
	stocksController.buyStock,
);

router.post(
	"/api/stocks/:ticker/sell",
	[authJwt.verifyToken],
	stocksController.sellStock,
);

module.exports = router;
