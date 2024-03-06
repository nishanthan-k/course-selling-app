const express = require("express");
const { adminMiddleWare, adminAlreadyExists } = require("../middlewares/admin");
const { Admin } = require("../db");
const router = express.Router();

router.post("/signup", adminAlreadyExists, (req, res) => {
  const { email, password } = req.body;

  // if no admin is available with this email
  Admin.create({ email: email, password: password })
    .then(() => {
      res.status(201).json({ msg: "Admin created successfully" });
    })
    .catch((error) => {
      if (error instanceof BadGatewayError) {
        res.status(502).json({ msg: "Bad Gateway" });
      } else if (error instanceof GatewayTimeoutError) {
        res.status(504).json({ msg: "Gateway Timeout" });
      } else {
        res.status(500).json({ msg: "Internal Server Error" });
      }
    });
});

router.post("/courses", adminMiddleWare, (req, res) => {
  const {title, description, imageUrl, price} = req.body

  
});

router.get("/courses", adminMiddleWare, (req, res) => {
  res.json({ msg: "Course List" });
});

module.exports = router;
