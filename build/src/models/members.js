const mongoose = require("mongoose");
const validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");
const memberSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
    minlength: 2,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email Already Exist"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  phone_no: {
    type: Number,
    required: true,
    minlength: 10,
  },
  fathers_name: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  branch_position: {
    type: String,
    required: true,
  },
  date_created: {
    type: String,
    // required: true,
  },
  assigned_under: {
    type: String,
    required: true,
  },
  assigned_by: {
    type: String,
    // required: true,
  },
  address: { type: String, required: true },
  assigned_info: {
    type: Array,
  },
  password: {
    type: String,
    required: true,
  },
});
const Member = new mongoose.model("Member", memberSchema);
module.exports = Member;
