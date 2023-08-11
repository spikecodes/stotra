const db = require("../models");
const User = db.user;

checkDuplicateUsername = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username,
  })
    .then((user) => {
      if (user) {
        res
          .status(400)
          .send({ message: "Failed! Username is already in use!" });
        return;
      }
      next();
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

const verifySignUp = {
  checkDuplicateUsername,
};

module.exports = verifySignUp;
