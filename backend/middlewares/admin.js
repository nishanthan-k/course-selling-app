const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { Admin } = require("../db/index");

const adminMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];  //["Bearer", token]
  const jwtDecode = jwt.verify(token, JWT_SECRET);

  if (jwtDecode.username && jwtDecode.type === "admin") {
    next();
  } else {
    res.status(403).json({ msg: "You are not authenticated" });
  }
};

const adminAlreadyExists = async (req, res, next) => {
  const { email } = req.body;

  try {
    const admin = await Admin.findOne({ email: email });

    if (admin) {
      res.status(403).json({ msg: "Admin already exists" });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  adminMiddleware,
  adminAlreadyExists,
};
