const { ObjectId } = require("bson");
let mongoose = require("mongoose");
let employerSchema = new mongoose.Schema({
  user_id: {
    type: ObjectId,
    required: true,
    unique: true,
  },
  company_logo: {
    type: String,
  },
  company_name: {
    type: String,
    required: true,
  },
  address_details: {
    street: {
      type: String,
      required: true,
    },
    zip_code: {
      type: String,
      required: true,
    },
    state: {
      id: {
        type: ObjectId,
      },
      name: {
        type: String,
      },
    },
    city: {
      id: {
        type: ObjectId,
      },
      name: {
        type: String,
      },
    },
    landmark: {
      type: String,
    },
  },
  designation: {
    type: String,
    required: true,
  },
  no_of_employees: {
    type: Number,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  linkedin_url: {
    type: String,
    required: true,
  },
  official_mail_id: {
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
module.exports = mongoose.model("employer_details", employerSchema);
