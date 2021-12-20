const mongoose = require("mongoose");

const bgvSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    pdf: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("bgvModel", bgvSchema);
