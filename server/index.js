const path = require("path");
const morgan = require("morgan"); //import morgan
const { log } = require("mercedlogger"); // import mercedlogger's log function
const cors = require("cors");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3010;

const Database = require("./db");

// Middleware
app.use(cors);
app.use(morgan("tiny"));
app.use(express.json());

app.use("/api/stocks", require("./routes/stocks"));

app.listen(PORT, async () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
