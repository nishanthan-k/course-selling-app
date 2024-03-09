const express = require("express");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { adminMiddleware, adminAlreadyExists } = require("../middlewares/admin");
const { Admin, Course, User } = require("../db");
const router = express.Router();

router.post("/signup", adminAlreadyExists, async (req, res, next) => {
  const { email, password } = req.body;

  // if no admin is available with this email
  try {
    await Admin.create({ email: email, password: password });

    res.status(201).json({ msg: "Admin created successfully" });
  } catch (err) {
    next(err);
  }
});

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email, password });
  try {
    if (admin) {
      const token = jwt.sign({ username: email, type: "admin" }, JWT_SECRET);

      res.json({ token: token });
    } else {
      res.status(411).json({ msg: "Incorrect credentials" });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/courses", adminMiddleware, async (req, res, next) => {
  const { title, description, imageUrl, price, isPublished } = req.body;

  try {
    const course = await Course.create({
      title,
      description,
      imageUrl,
      price,
      isPublished,
    });

    res
      .status(201)
      .json({ msg: "Course created successfully", courseId: course._id });
  } catch (err) {
    next(err);
  }
});

router.get("/courses", adminMiddleware, async (req, res, next) => {
  try {
    const allCourses = await Course.find({});

    res.json({ courses: allCourses });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
