const express = require("express");
const router = express.Router();
const yahooFinance = require("yahoo-finance2").default;

module.exports = router;

// Get all
router.get("/:ticker", async (req, res) => {
  const ticker = req.params.ticker;
  const quote = await yahooFinance.quote(ticker);
  const { regularMarketPrice } = quote;
  res.send({ price: regularMarketPrice });
});
