const { ObjectId } = require("bson");
let mongoose = require("mongoose");
let jobSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    ref: "user_details",
  },
  job_title: {
    type: String,
    required: true,
  },
  job_type: {
    type: String,
    required: true,
  },
  jobStatus: {
    type: String,
  },
  job_category: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    requied: true,
  },
  salary_range: {
    min: {
      type: String,
      required: true,
    },
    max: {
      type: String,
      required: true,
    },
  },
  remote_type: {
    type: String,
    requied: true,
  },
  education_level: {
    type: String,
    required: true,
  },
  minimum_experience_required: {
    type: String,
    required: true,
  },
  maximum_experience_required: {
    type: String,
    required: true,
  },
  top_skills: {
    type: String,
    // required: true,
  },
  post_vacancies: {
    type: String,
    required: true,
  },
  is_visume: {
    type: Boolean,
    /* required: true, */
  },
  is_scandidate: {
    type: Boolean,
    required: true,
  },
  job_description: {
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
  top_skills: [
    {
      type: String,
    },
  ],
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("job_details", jobSchema);
