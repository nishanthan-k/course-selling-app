const { Admin } = require("../db/index");

const adminMiddleware = async (req, res, next) => {
  const { email, password } = req.headers;

  try {
    const admin = await Admin.findOne({ email: email, password: password });

    if (admin) {
      next();
    } else {
      res.status(403).json({ msg: "Admin doesn't exist" });
    }
  } catch (err) {
    next(err);
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
