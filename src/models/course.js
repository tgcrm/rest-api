const mongoose = require("mongoose");

const courseschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  course_code: {
    type: String,
    unique: [true, "Course Already Exist"],
    required: true,
  },
  course_fee: {
    type: String,
    required: true,
  },

  date_created: {
    type: String,
    // required: true,
  },

  created_by: {
    type: String,
    // required: true,
  },
});
const Course = new mongoose.model("Course", courseschema);
module.exports = Course;
