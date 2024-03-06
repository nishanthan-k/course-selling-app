const { User } = require("../db/index");

const userMiddleware = (req, res, next) => {
  const { email, password } = req.headers;

  User.findOne({ email: email, password: password }).then((value) => {
    if (value) {
      next();
    } else {
      return res.status(403).json({ msg: "User doesn't exists" });
    }
  });
};

module.exports = userMiddleware;
