const { ObjectId } = require("bson");
let mongoose = require("mongoose");
let candidateSchema = new mongoose.Schema({
  user_id: {
    type: ObjectId,
    required: true,
    unique: true,
  },
  profile_url: {
    type: String,
    // required: true,
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
        type: String,
      },
      name: {
        type: String,
      },
    },
    landmark: {
      type: String,
    },
    // organization_strength: {
    //     type: String
    // },
    // country_id: {
    //     type: ObjectId,
    //     required: true,
    // },
    // country_name: {
    //     type: String,
    //     required: true,
    // },
    // address: {
    //     type: String,
    //     required: true,
    // }
  },
  education_data: {
    education_type: {
      type: String,
      required: true,
      default: true,
    },
    education_details: [
      {
        school_name: {
          type: String,
        },
        degree_id: {
          type: ObjectId,
        },
        degree_name: {
          type: String,
        },
        field_id: {
          type: ObjectId,
        },
        field_name: {
          type: String,
        },
        start_date: {
          month: {
            type: String,
          },
          year: {
            type: String,
          },
        },
        end_date: {
          month: {
            type: String,
          },
          year: {
            type: String,
          },
        },
        grade: {
          type: String,
        },
        currently_studying: {
          type: Boolean,
        },
        description: {
          type: String,
        },
      },
    ],
  },
  experience_data: {
    experience_type: {
      type: String,
      required: true,
    },
    experience_details: [
      {
        designation: {
          type: String,
        },
        company: {
          type: String,
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
          // id: {
          //     type: ObjectId
          // },
          // name: {
          type: String,
          // }
        },
        other_city: {
          type: String,
        },
        start_date: {
          type: String,
        },
        end_date: {
          type: String,
        },
        currently_working: {
          type: Boolean,
        },
        job_description: {
          type: String,
        },
      },
    ],
  },

  soft_skills: [
    {
      id: {
        type: ObjectId,
        // required: true
      },
      name: {
        type: String,
        // required: true
      },
    },
  ],
  technical_skills: [
    {
      id: {
        type: ObjectId,
        // required: true
      },
      name: {
        type: String,
        // required: true
      },
    },
  ],
  current_career: {
    id: {
      type: ObjectId,
      // required: true
    },
    name: {
      type: String,
      // required: true
    },
  },
  changecareer: {
    type: Boolean,
  },
  change_career: {
    id: {
      type: ObjectId,
    },
    name: {
      type: String,
    },
  },
  passion: {
    type: String,
    required: true,
  },
  languages: [
    {
      id: {
        type: ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
  // specialization: [{
  //     specialization_id: {
  //         type: ObjectId,
  //         required: true
  //     },
  //     specialization_name: {
  //         type: String,
  //         required: true
  //     }
  // }],
  salary_range: {
    min: {
      type: String,
      // required: true,
    },
    max: {
      type: String,
      // required: true,
    },
  },
  last_drawn_salary_range: {
    min: {
      type: String,
      // required: true,
    },
    max: {
      type: String,
      // required: true,
    },
  },
  joining_status: {
    type: Boolean,
  },
  join_within: {
    type: String,
  },
  resume_url: {
    type: String,
  },
  visume_url: {
    type: String,
  },
  onboard_with_this: {
    type: Boolean,
  },
  // service_to_be: {
  //     type: Boolean,
  //     charge: {
  //         type: String
  //     }
  // },
  // facebook_link: {
  //     type: String,
  // },
  // linkedin_link: {
  //     type: String
  // },
  // youtube_link: {
  //     type: String
  // },
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
module.exports = mongoose.model("candidate_details", candidateSchema);
