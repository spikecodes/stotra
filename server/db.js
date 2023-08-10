const mongoose = require("mongoose");
require("dotenv").config();

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

const UserScheme = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
  },
  { collection: "users" }
);

exports.User = mongoose.model("User", UserScheme);

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  console.log("Connected to Database");
});

export default db;
