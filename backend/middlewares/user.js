const { User } = require("../db/index");

const userMiddleware = async (req, res, next) => {
  const { email, password } = req.headers;

  try {
    const user = await User.findOne({ email: email, password: password });

    if (user) {
      next();
    } else {
      return res.status(403).json({ msg: "User doesn't exists" });
    }
  } catch (err) {
    next(err);
  }
};

const userAlreadyExists = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email, password: password });

    if (user) {
      console.log(user);
      res.status(403).json({ msg: "User already exists" });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { userMiddleware, userAlreadyExists };
