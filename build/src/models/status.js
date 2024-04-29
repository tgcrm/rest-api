const mongoose = require("mongoose");

const statusschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color_code: {
    type: String,
    unique: [true, "status Already Exist"],
    required: true,
  },
  admin_count: {
    type: String,
    required: true,
  },
  followup_count: {
    type: String,
    required: true,
  },

  date_created: {
    type: String,
    // required: true,
  },

  created_by: {
    type: String,
    // required: true,
  },
});
const status = new mongoose.model("Status", statusschema);
module.exports = status;
