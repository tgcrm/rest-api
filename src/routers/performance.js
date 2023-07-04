const express = require("express");
const router = new express.Router();
const Performance = require("../models/performance");
//////fetch performance//////////////
router.get("/performance", async (req, res) => {
  try {
    const perfromanceRes = await Performance.find();
    res.status(200).json(perfromanceRes);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving leads", error });
  }
});
////////////UPDATE performances/////////////
router.post("/performance", async (req, res) => {
  try {
    const newdata = req.body; // Assuming you have performanceId and leads data in the request body

    // Find the performance performance by ID
    const performanced = await Performance.findOne({
      lead_id: newdata.lead_id,
      staff_id: newdata.staff_id,
      res_date: newdata.res_date,
    });

    if (!performanced) {
      const insertdata = new Performance(newdata);
      const ReS_data = await insertdata.save();
      return res
        .status(200)
        .json({ message: "Newdata", Performance: ReS_data });
    } else {
      const data = await Performance.updateMany(
        {
          lead_id: { $eq: newdata.lead_id },
          staff_id: { $eq: newdata.staff_id },
          res_date: { $eq: newdata.res_date },
        },
        {
          $set: {
            lead_status: newdata.lead_status,
            lead_course: newdata.lead_course,
            lead_comment: newdata.lead_comment,
          },
        }
      );
      res.json({ message: "Performance Updated", data: data });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/performance", (req, res) => {});
////////////Delete performance////////////////
router.delete("/performance", (req, res) => {});
module.exports = router;
