const { ObjectId } = require('bson');
let mongoose = require('mongoose');
let candidateSchema = new mongoose.Schema({
    user_id: {
        type: String,
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
        country: {
            type: ObjectId,
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
            location: {
                type: ObjectId
            },
            country: {
                type: ObjectId
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
                degree: {
                    type: ObjectId
                },
                field: {
                    type: ObjectId
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
            type: ObjectId,
            required: true
        }
    ],
    languages: [
        {
            name: {
                type: ObjectId,
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
        type: ObjectId,
        required: true
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