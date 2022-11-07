const { ObjectId } = require("bson");
let mongoose = require("mongoose");
let employerSchema = new mongoose.Schema({
  user_id: {
    type: ObjectId,

    unique: true,
  },
  company_logo: {
    type: String,
  },
  //
  company_name: {
    type: String,
    required: true,
  },
  company_address: {
    type: String,
    required: true,
  },
  address_details: {
    street: {
      type: String,

    },
    zip_code: {
      type: String,
      required: true,
    },
    state: {
      id: {
        type: String,
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
  },
  company_description: {
    type: String,
  },
  no_of_employees: {
    type: Number,
    required: true,
  },
  experties: {
    type: String,
    required: true,
  },
  languages: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  //
  website: {
    type: String,

  },
//
  linkedin_url: {
    type: String,
    required: true,
  },
  instagram_url: {
    type: String,
    required: true,
  },
  facebook_url: {
    type: String,
    required: true,
  },
//
  official_mail_id: {
    type: String,
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
