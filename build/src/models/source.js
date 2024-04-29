const mongoose = require("mongoose");

const sourceschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color_code: {
    type: String,
    unique: [true, "source Already Exist"],
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
const source = new mongoose.model("Source", sourceschema);
module.exports = source;
