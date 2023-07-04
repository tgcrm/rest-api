const express = require("express");
const router = new express.Router();
const Member = require("../models/members");
///////////Registering Members/////////////
router.post("/member", async (req, res) => {
  try {
    const member = new Member(req.body);
    const memberData = await member.save();
    res.status(201).json(memberData);
  } catch (e) {
    res.status(400).json(e);
  }
  console.log(req.body);
});
//////////Fetching Members////////
router.get("/member", async (req, res) => {
  try {
    const memberData = await Member.find();
    res.status(201).json(memberData);
  } catch (e) {
    res.status(400).json(e);
  }
  console.log(req.body);
});
////////////UPDATE Members/////////////
router.post("/assign-leads", async (req, res) => {
  try {
    const { member_id, leads } = req.body; // Assuming you have memberId and leads data in the request body

    // Find the member member by ID
    const member = await Member.findById(member_id);

    if (!member) {
      return res.status(404).json({ error: "member member not found" });
    }
    const newLeads = leads.filter((lead) => {
      return !member.assigned_info.some(
        (assignedLead) => assignedLead.lead_id === lead.lead_id
      );
    });

    member.assigned_info.push(...newLeads);
    // Save the updated member document
    await member.save();

    res.json({ message: "Leads assigned successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/member", (req, res) => {});
////////////Delete Member////////////////
router.delete("/member", (req, res) => {});
module.exports = router;
