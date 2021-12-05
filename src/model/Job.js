const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      // required: true,
    },

    // catergory: {
    //   type: String,
    //   required: true,
    // },
    Type: {
      type: String,
      // required: true,
    },
    Category: {
      type: String,
      // required: true,
    },
    City: {
      type: String,
      // required: true,
    },
    Country: {
      type: String,
    },
    Salary: {
      type: Number,
    },
    applicants: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("jobDetails", jobSchema);
