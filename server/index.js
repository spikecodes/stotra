const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const port = 3010;

// Read password from dotenv file
const password = process.env.STOTA_MONGODB_PASSWORD;

const uri =
  "mongodb+srv://" +
  process.env.STOTA_MONGODB_USERNAME +
  ":" +
  password +
  "@" +
  process.env.STOTA_MONGODB_CLUSTER +
  "/?authMechanism=DEFAULT&retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to Database");
});

app.use(express.json());

app.use("/api/stocks", require("./routes/stocks"));

app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
