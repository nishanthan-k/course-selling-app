const { Admin } = require("../db/index");

const adminMiddleWare = (req, res, next) => {
  const { email, password } = req.headers;

  Admin.findOne({ email: email, password: password })
    .then((value) => {
      if (value) {
        next();
      } else {
        res.status(403).json({ msg: "Admin doesn't exists" });
      }
    })
    .catch((err) => {
      res.status(500).json({ msg: "Internal server error" });
    });
};

const adminAlreadyExists = (req, res, next) => {
  console.log(req.body);
  const { email } = req.body;

  Admin.findOne({ email: email })
    .then((value) => {
      if (value) {
        res.status(403).json({ msg: "Admin already exists" });
      } else {
        next();
      }
    })
    .catch((err) => {
      res.status(500).json({ msg: "Internal server error" });
    });
};

module.exports = {
  adminMiddleWare,
  adminAlreadyExists,
};
