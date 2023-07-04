const express = require("express");
const router = new express.Router();
const Course = require("../models/course");
///////////Registering Members/////////////
router.post("/course", async (req, res) => {
  try {
    const course = new Course(req.body);
    const courseData = await course.save();
    res.status(201).json(courseData);
  } catch (e) {
    res.status(400).json(e);
  }
  console.log(req.body);
});
//////////Fetching courses////////
router.get("/course", async (req, res) => {
  try {
    const courseData = await Course.find();
    res.status(201).json(courseData);
  } catch (e) {
    res.status(400).json(e);
  }
  console.log(req.body);
});
////////////UPDATE courses/////////////
router.patch("/course", (req, res) => {});
////////////Delete course////////////////
router.delete("/course", (req, res) => {});
module.exports = router;
