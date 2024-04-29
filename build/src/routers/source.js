const express = require("express");
const router = new express.Router();
const Source = require("../models/source");
///////////Registering Members/////////////
router.post("/source", async (req, res) => {
  try {
    const source = new Source(req.body);
    const sourceData = await source.save();
    res.status(201).json(sourceData);
  } catch (e) {
    res.status(400).json(e);
  }
  console.log(req.body);
});
//////////Fetching sources////////
router.get("/source", async (req, res) => {
  try {
    const sourceData = await Source.find();
    res.status(201).json(sourceData);
  } catch (e) {
    res.status(400).json(e);
  }
  console.log(req.body);
});
////////////UPDATE source/////////////
router.post("/update-source", async (req, res) => {
  let { _id, name, color_code } = req.body;
  try {
    let getSourceById = await Source.findById(_id);

    if (getSourceById) {
      let getUpdateResponse = await Source.updateOne(
        { _id: { $eq: _id } },
        { $set: { name, color_code } }
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
router.post("/delete-source", async (req, res) => {
  const { documentId } = req.body;
  try {
    const docs = await Source.deleteOne({ _id: documentId });
    res.send(req.body);
  } catch (error) {
    console.error("Error updating document", error);
    res.status(500).send("Error updating document.");
  }
});
module.exports = router;
