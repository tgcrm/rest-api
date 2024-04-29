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
router.post("/update-status", async (req, res) => {
  let { _id, name, color_code, admin_count, followup_count } = req.body;
  try {
    let getStatusById = await Status.findById(_id);

    if (getStatusById) {
      let getUpdateResponse = await Status.updateOne(
        { _id: { $eq: _id } },
        { $set: { name, color_code, admin_count, followup_count } }
      );
    }

    res.status(201).json({
      messgae: "Status Updated",
    });
  } catch (e) {
    // res.status(400).json(e);
  }
  console.log(req.body);
});
////////////Delete status////////////////
router.post("/deleteStatus", async (req, res) => {
  const documentId = req.body.documentId;
  try {
    const docs = await Status.deleteOne({ _id: documentId });
    res.send(req.body.newColor);
  } catch (error) {
    console.error("Error updating document", error);
    res.status(500).send("Error updating document.");
  }
});

module.exports = router;
