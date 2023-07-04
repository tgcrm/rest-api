const express = require("express");
const router = new express.Router();
const Status = require("../models/status");
///////////Registering Members/////////////
router.post("/status", async (req, res) => {
  try {
    const status = new Status(req.body);
    const statusData = await status.save();
    res.status(201).json(statusData);
  } catch (e) {
    res.status(400).json(e);
  }
  console.log(req.body);
});
//////////Fetching statuss////////
router.get("/status", async (req, res) => {
  try {
    const statusData = await Status.find();
    res.status(201).json(statusData);
  } catch (e) {
    res.status(400).json(e);
  }
  console.log(req.body);
});
////////////UPDATE statuss/////////////
router.patch("/status", (req, res) => {});
////////////Delete status////////////////
router.delete("/status", (req, res) => {});
module.exports = router;
