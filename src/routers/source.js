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
////////////UPDATE sources/////////////
router.patch("/source", (req, res) => {});
////////////Delete source////////////////
router.delete("/source", (req, res) => {});
module.exports = router;
