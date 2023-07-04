const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  action: {
    type: String,
    default: "No Response",
  },
  address: {
    type: String,
    required: true,
  },
  assigned_to: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "green",
  },
  comment: {
    type: String,
    default: "",
  },
  course: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    default: "",
  },
  mobile: {
    type: String,
    required: true,
  },
  modified_date: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  progressPercent: {
    type: Number,
    default: 0,
  },
  source: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  tagcolor: {
    type: String,
    default: "blue",
  },
  assigned_info: {
    type: Array,
    default: [],
  },
  previous_status: {
    type: String,
  },
});

const Lead = mongoose.model("Lead", leadSchema);

module.exports = Lead;
