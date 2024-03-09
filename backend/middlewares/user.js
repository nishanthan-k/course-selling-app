const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { User } = require("../db/index");

const userMiddleware = async (req, res, next) => {
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  const jwtDecode = jwt.verify(token, JWT_SECRET);

  if (jwtDecode.username && jwtDecode.type === "user") {
    next();
  } else {
    res.status(403).json({ msg: "You are not authenticated" });
  }
};

const userAlreadyExists = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      res.status(403).json({ msg: "User already exists" });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { userMiddleware, userAlreadyExists };
