const express = require("express");
const router = express.Router();
const Lead = require("../models/leads");

// POST request to insert leads into the database
router.post("/leads", async (req, res) => {
  try {
    const leads = req.body; // Assuming the array of objects is sent in the request body

    // Filter out leads with existing mobile numbers
    const existingMobiles = await Lead.find({
      mobile: { $in: leads.map((lead) => lead.mobile) },
    });
    const newLeads = leads.filter(
      (lead) =>
        !existingMobiles.some(
          (existingLead) => existingLead.mobile === lead.mobile
        )
    );

    // Insert new leads into the database
    const insertedLeads = await Lead.insertMany(newLeads);

    res.status(201).json(insertedLeads);
  } catch (error) {
    res.status(500).json({ message: "Error inserting leads", error });
  }
});

// GET request to retrieve leads from the database
router.get("/leads", async (req, res) => {
  try {
    const leads = await Lead.find();
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving leads", error });
  }
});

router.post("/update-leads", async (req, res) => {
  try {
    const { member_name, leads } = req.body; // Assuming you have memberId and leads data in the request body
    const promise = leads.map(async (item) => {
      const lead = await Lead.findById(item.lead_id); // Find the lead by ID

      if (!lead) {
        return res.status(404).json({ error: "Leads not found" });
      }
      lead.assigned_to = member_name;
      await lead.save();
    });
    Promise.all(promise).then((result) => {
      res.json({ message: "Leads Updated" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
///////leadstatus Update
router.post("/update-status-leads", async (req, res) => {
  try {
    const {
      lead_color,
      previous_status,
      lead_status,
      lead_id,
      lead_comment,
      lead_course,
    } = req.body; // Assuming you have memberId and leads data in the request body

    const lead = await Lead.findById(lead_id); // Find the lead by ID

    if (!lead) {
      return res.status(404).json({ error: "Leads not found" });
    }
    lead.status = lead_status;
    lead.comment = lead_comment;
    lead.course = lead_course;
    const leaddata = await Lead.updateOne(
      {
        _id: { $eq: lead_id },
      },
      {
        $set: {
          status: lead_status,
          comment: lead_comment,
          course: lead_course,
          previous_status: previous_status,
          tagcolor: lead_color,
        },
      }
    );
    res.json({ message: "lead Updated", data: leaddata });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
