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
////////////UPDATE course/////////////
router.post("/update-course", async (req, res) => {
  let { _id, name, course_fee, course_code } = req.body;
  try {
    let getCourseById = await Course.findById(_id);

    if (getCourseById) {
      let getUpdateResponse = await Course.updateOne(
        { _id: { $eq: _id } },
        { $set: { name, course_fee, course_code } }
      );
    }

    res.status(201).json({
      messgae: "source Updated",
    });
  } catch (e) {
    // res.status(400).json(e);
  }
  console.log(req.body);
});
////////////Delete course////////////////
router.post("/delete-course", async (req, res) => {
  const documentId = req.body.documentId;
  try {
    const docs = await Course.deleteOne({ _id: documentId });
    res.send(req.body.newColor);
  } catch (error) {
    console.error("Error updating document", error);
    res.status(500).send("Error updating document.");
  }
});
module.exports = router;
