const express = require("express");
const router = express.Router();
const Lead = require("../models/leads");
const { default: mongoose } = require("mongoose");

const PAGE_SIZE = 300; // Number of documents per page

const page = 1; // Replace with the desired page number
const skipAmount = (page - 1) * PAGE_SIZE;
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
    const leads = await Lead.find({});
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving leads", error });
  }
});

router.post("/update-leads", async (req, res) => {
  try {
    const { member_name, leads, assign_date } = req.body; // Assuming you have memberId and leads data in the request body
    const promise = leads.map(async (item) => {
      const lead = await Lead.findById(item.lead_id); // Find the lead by ID

      if (!lead) {
        return res.status(404).json({ error: "Leads not found" });
      }
      lead.assigned_to = member_name;
      lead.modified_date = assign_date;
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
/////////////////Action Update////////////////
router.post("/update-action-leads", async (req, res) => {
  try {
    const { lead_id, action, color } = req.body; // Assuming you have memberId and leads data in the request body

    const lead = await Lead.findById(lead_id); // Find the lead by ID

    if (!lead) {
      return res.status(404).json({ error: "Leads not found" });
    }

    const leaddata = await Lead.updateOne(
      {
        _id: { $eq: lead_id },
      },
      {
        $set: {
          action: action,
          color: color,
        },
      }
    );
    res.json({ message: "lead Updated", data: leaddata });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

////////////////deleted Leads//////////
router.post("/deleteLeads", async (req, res) => {
  const documentId = req.body.documentId;
  try {
    const docs = await Lead.deleteOne({ _id: documentId });
    res.json("Lead Deleted");
  } catch (error) {
    console.error("Error updating document", error);
    res.status(500).send("Error updating document.");
  }
});

router.delete("/delete-many", async (req, res) => {
  const { documentId } = req.body;

  try {
    // Convert the array of ids to MongoDB ObjectId

    let objectIds = documentId.map((s) => new mongoose.Types.ObjectId(s));
    // Delete the documents based on _id match
    const result = await Lead.deleteMany({ _id: { $in: objectIds } });

    res
      .status(200)
      .json({ message: "Documents deleted successfully", result: result });
  } catch (error) {
    res.status(500).json({ message: "Error deleting documents", error });
  }
});

router.post("/findlead", async (req, res) => {
  const documentId = req.body.documentId;
  try {
    const docs = await Lead.findById(documentId);
    res.json({ data: docs, msg: "Lead found" });
  } catch (error) {
    console.error("Error updating document", error);
    res.status(500).send("Error updating document.");
  }
});
router.post("/filter-leads", async (req, res) => {
  try {
    const { assigned_to } = req.body;

    // Find students that match the search criteria
    const matchingLeads = await Lead.find({ assigned_to: assigned_to });
    res.status(200).json(matchingLeads);
    console.log(matchingLeads);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/trial-leads", async (req, res) => {
  try {
    const {
      name: filtername,
      status: filterstatus,
      mobile: filterPhone,
      source: filtersource,
      course: filtercourse,
      date,
      assigned_to: filterassigned_to,
      address: filteraddress,
      action: filteAction,
      modified_date: assign_date,
    } = req.body;
    const filterQuery = {
      $and: [
        filtername.length > 0 ? { name: { $in: filtername } } : {},

        filtersource.length > 0 ? { source: { $in: filtersource } } : {},

        filterPhone.length > 0 ? { mobile: { $in: filterPhone } } : {},

        filterstatus.length > 0 ? { status: { $in: filterstatus } } : {},

        filterassigned_to.length > 0
          ? { assigned_to: { $in: filterassigned_to } }
          : {},

        filtercourse.length > 0 ? { course: { $in: filtercourse } } : {},

        filteraddress.length > 0 ? { address: { $in: filteraddress } } : {},

        filteAction.length > 0 ? { action: { $in: filteAction } } : {},

        date.length > 0
          ? {
              date: {
                $gte: date[0],
                $lte: date[1],
              },
            }
          : {},

        assign_date.length > 0
          ? {
              modified_date: {
                $gte: assign_date[0],
                $lte: assign_date[1],
              },
            }
          : {},
      ],
    };

    const matchingLeads = await Lead.find(filterQuery);

    const matchingLeadsCount = await Lead.find(filterQuery).countDocuments();
    res.status(200).json({ matchingLeads, matchingLeadsCount });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// router.post("/filter-leads", async (req, res) => {
//   try {
//     const filterForm = req.body;
//     // Create a query object based on the filterForm
//     const query = {
//       assigned_to: filterForm.full_name,
//     };

//     if (filterForm.name.length > 0) {
//       query.name = { $in: filterForm.name };
//     }

//     if (filterForm.gender.length > 0) {
//       query.gender = { $in: filterForm.gender };
//     }

//     if (filterForm.status.length > 0) {
//       query.status = { $in: filterForm.status };
//     }

//     if (filterForm.mobile.length > 0) {
//       query.mobile = { $in: filterForm.mobile };
//     }

//     if (filterForm.source.length > 0) {
//       query.source = { $in: filterForm.source };
//     }

//     if (filterForm.dob) {
//       query.dob = filterForm.dob;
//     }

//     if (filterForm.role.length > 0) {
//       query.role = { $in: filterForm.role };
//     }

//     if (filterForm.course.length > 0) {
//       query.course = { $in: filterForm.course };
//     }

//     // Apply the date range filter
//     if (filterForm.date.length === 2) {
//       query.date = {
//         $gte: filterForm.date[0],
//         $lte: filterForm.date[1],
//       };
//     }

//     if (filterForm.address.length > 0) {
//       query.address = { $in: filterForm.address };
//     }
//     // Fetch data from MongoDB using the created query
//     const result = await Lead.find(query);

//     // Send the data as the response
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
module.exports = router;
