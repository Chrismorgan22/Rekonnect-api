const { ObjectId } = require("bson");
let mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,

    unique: true,
  },
  phone: {
    type: String,
  },
  google_login: {
    type: String,
  },
  facebook_login: {
    type: String,
  },
  linkedin_login: {
    type: String,
  },
  password: {
    type: String,
  },
  confirm_password: {
    type: String,
  },
  token: {
    type: String,
  },
  user_token: {
    type: String,
  },
  register_complete: {
    type: Boolean,
    default: false,
  },
  is_deleted: {
    type: Boolean,
    default: false, 
  },
  status: {
    type: Boolean,
    default: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
  googleAuth: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("user_details", userSchema);
