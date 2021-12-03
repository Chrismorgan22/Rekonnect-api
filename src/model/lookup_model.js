const { ObjectId } = require("bson");
let mongoose = require("mongoose");
let lookupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lookup_type: {
    type: String,
    required: true,
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
});
module.exports = mongoose.model("lookup_details", lookupSchema);
