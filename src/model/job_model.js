const { ObjectId } = require('bson');
let mongoose = require('mongoose');
let jobSchema = new mongoose.Schema({
    job_title: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        requied: true
    },
    job_descritption: {
        type: String,
        required: true,
    },
    pin_code: {
        type: String,
        required: true,
    },
    location_id: {
        type: ObjectId,
        required: true,
    },
    minimum_experience_required: {
        type: String,
        required: true
    },
    salary_range: {
        min: {
            type: String,
            required: true
        },
        max: {
            type: String,
            required: true
        }
    },
    job_type: {
        type: Number,
        required: true,
    },
    user_id: {
        type: ObjectId,
        required: true,
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
module.exports = mongoose.model('job_details', jobSchema)