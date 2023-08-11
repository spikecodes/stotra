const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user
    .save()
    .then((user) => {
      if (user) {
        user
          .save()
          .then((user) => {
            if (user) {
              res.send({ message: "User was registered successfully!" });
            }
          })
          .catch((err) => {
            if (err) {
              res.status(500).send({ message: err });
            }
          });
      }
    })
    .catch((err) => {
      console.log("bagg" + err);
      res.status(500).send({ message: err });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });
      res.status(200).send({
        id: user._id,
        username: user.username,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};
