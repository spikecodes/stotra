const db = require("../db");
const UserModel = require("../models/user");

// Sign up
exports.signUp = (req, res) => {
  console.log("BODY:", req.body);
  UserModel.create(req.body)
    .then((users) => req.json(users))
    .catch((err) => res.json({ err }));
};

// Sign in
exports.signIn = (req, res) => {
  console.log("BODY:", req.body);
  res.json({ message: "Sign in" });
};
