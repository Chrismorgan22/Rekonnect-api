const { ObjectId } = require('bson');
let mongoose = require('mongoose');
let candidateSchema = new mongoose.Schema({
    user_id: {
        type: ObjectId,
        required: true,
        unique: true
    },
    profile_url: {
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
        country_id: {
            type: ObjectId,
            required: true,
        },
        country_name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        }
    },
    experience_details: {
        experience_type: {
            type: String,
            required: true,
        },
        work_experience: [{
            title: {
                type: String
            },
            company: {
                type: String
            },
            location_id: {
                type: ObjectId
            },
            location_name: {
                type: String
            },
            country_id: {
                type: ObjectId
            },
            country_name: {
                type: String
            },
            total_experience: {
                from: {
                    month: {
                        type: String
                    },
                    year: {
                        type: String
                    }
                },
                to: {
                    month: {
                        type: String
                    },
                    year: {
                        type: String
                    }
                }
            },
            job_description: {
                type: String,
            }
        }]
    },
    education: {
        is_educated: {
            type: Boolean,
            required: true,
            default: true
        },
        education_details: [
            {
                name: {
                    type: String
                },
                degree_id: {
                    type: ObjectId
                },
                degree_name: {
                    type: String
                },
                field_id: {
                    type: ObjectId
                },
                field_name: {
                    type: String
                },
                total_time: {
                    from: {
                        month: {
                            type: String
                        },
                        year: {
                            type: String
                        }
                    },
                    to: {
                        month: {
                            type: String
                        },
                        year: {
                            type: String
                        }
                    }
                },
                grade: {
                    type: String
                },
                description: {
                    type: String
                }
            }
        ],
    },
    skills: [
        {
            skill_id: {
                type: ObjectId,
                required: true
            },
            skill_name: {
                type: String,
                required: true
            }
        },

    ],
    languages: [
        {
            language_id: {
                type: ObjectId,
                required: true
            },
            language_name: {
                type: String,
                required: true
            },
            is_speak: {
                type: Boolean,
                required: true,
                default: false
            },
            is_write: {
                type: Boolean,
                required: true,
                default: false
            },
            is_read: {
                type: Boolean,
                required: true,
                default: false
            }
        }
    ],
    specialization: [{
        specialization_id: {
            type: ObjectId,
            required: true
        },
        specialization_name: {
            type: String,
            required: true
        }
    }],
    career_change: {
        is_willing: {
            type: Boolean,
            required: true,
        },
        career_detail: {
            type: String,
        }
    },
    service_to_be: {
        type: Boolean,
        charge: {
            type: String
        }
    },
    facebook_link: {
        type: String,
    },
    linkedin_link: {
        type: String
    },
    youtube_link: {
        type: String
    },
    is_deleted: {
        type: Boolean,
        default: false,
    },
    status: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
})
module.exports = mongoose.model('candidate_details', candidateSchema)