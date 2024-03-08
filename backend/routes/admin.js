const express = require("express");
const { adminMiddleware, adminAlreadyExists } = require("../middlewares/admin");
const { Admin, Course } = require("../db");
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

router.post("/courses", adminMiddleware, async (req, res, next) => {
  const { title, description, imageUrl, price, isPublished } = req.body;

  try {
    const course = await Course.create({
      title,
      description,
      imageUrl,
      price,
      isPublished
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
