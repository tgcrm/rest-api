const mongoose = require("mongoose");

const performanceSchema = new mongoose.Schema({
  staff_id: {
    type: String,
    required: true,
  },
  staff_name: {
    type: String,

    required: true,
  },
  lead_id: {
    type: String,
    required: true,
  },

  res_date: {
    type: String,
  },

  lead_status: {
    type: String,
    required: true,
  },
  lead_course: {
    type: String,
  },
  lead_comment: {
    type: String,
  },
});
const Performance = new mongoose.model("Performance", performanceSchema);
module.exports = Performance;
