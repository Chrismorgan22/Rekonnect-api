const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    // catergory: {
    //   type: String,
    //   required: true,
    // },
    company: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    Requirements: {
      type: Array,
      default: [],
    },
    Salary: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("jobDetails", jobSchema);
