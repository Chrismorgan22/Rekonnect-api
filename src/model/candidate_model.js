// const { String } = require("bson");
let mongoose = require("mongoose");
let candidateSchema = new mongoose.Schema({
  user_id: {
    type: String,
    ref: "user_details",
    unique: true,
  },
  profile_url: {
    type: String,
    //
  },
  address_details: {
    street: {
      type: String,
    },
    zip_code: {
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
    landmark: {
      type: String,
    },
    // organization_strength: {
    //     type: String
    // },
    // country_id: {
    //     type: String,
    //
    // },
    // country_name: {
    //     type: String,
    //
    // },
    // address: {
    //     type: String,
    //
    // }
  },
  education_data: {
    education_type: {
      type: String,

      default: true,
    },
    education_details: [
      {
        school_name: {
          type: String,
        },
        degree_id: {
          type: String,
        },
        degree_name: {
          type: String,
        },
        field_id: {
          type: String,
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
          //     type: String
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
        type: String,
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
      type: String,
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
      type: String,
    },
    name: {
      type: String,
    },
  },
  passion: {
    type: String,
  },
  languages: [
    {
      id: {
        type: String,
      },
      name: {
        type: String,
      },
    },
  ],
  // specialization: [{
  //     specialization_id: {
  //         type: String,
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
      //
    },
    max: {
      type: String,
      //
    },
  },
  last_drawn_salary_range: {
    min: {
      //
      type: Number,
      //
    },
    max: {
      //
      type: Number,
      //
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
  urgentJoiningStatus: {
    type: Boolean,
  },
  urgentDateInput: {
    type: Date,
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
