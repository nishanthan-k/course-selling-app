const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://usernamehere:passowordhere@owncluster.pgtbuvo.mongodb.net/course_selling_app"
);

const AdminSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  purchasedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  price: Number,
  isPublished: Boolean
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
