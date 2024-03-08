const express = require("express");
const { userAlreadyExists, userMiddleware } = require("../middlewares/user");
const { User, Course } = require("../db");
const { route } = require("./admin");
const router = express.Router();

router.post("/signup", userAlreadyExists, async (req, res, next) => {
  const { email, password } = req.body;

  try {
    await User.create({ email, password });

    res.status(403).json({ msg: "User created successfully" });
  } catch (err) {
    next(err);
  }
});

router.get("/courses", userMiddleware, async (req, res, next) => {
  try {
    const allPublishedCourses = await Course.find({ isPublished: true });

    res.json({ courses: allPublishedCourses });
  } catch (err) {
    next(err);
  }
});

router.post(
  "/courses/purchase/:courseId",
  userMiddleware,
  async (req, res, next) => {
    console.log(1);
    try {
      const { courseId } = req.params;
      const { email } = req.headers;

      console.log(2);
      await User.updateOne(
        { email: email },
        {
          $push: {
            purchasedCourses: courseId,
          },
        }
      );

      res.json({ msg: "Purchase completed" });
    } catch (err) {
      next(err);
    }
  }
);

router.get("/mycourses", userMiddleware, async (req, res, next) => {
  try {
    const { email } = req.headers;

    const user = await User.findOne({email: email})

    const courses = await Course.find({
      _id: {
        "$in": user.purchasedCourses
      }
    })

    res.json({courses: courses})

  } catch (err) {
    next(err);
  }
});

module.exports = router;
