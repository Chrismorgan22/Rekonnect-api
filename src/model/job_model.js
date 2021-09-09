const { ObjectId } = require('bson');
let mongoose = require('mongoose');
let jobSchema = new mongoose.Schema({
    job_title: {
        type: String,
        required: true,
    },
    job_details: {
        type: String,
        required: true,
    },
    graduation_id: {
        type: ObjectId,
        required: true,
    },
    job_location_id: {
        type: ObjectId,
        required: true,
    },
    employment_type: {
        type: String,
        required: true,
    },
    speacialization_id: {
        type: ObjectId,
        required: true,
    },
    user_id: {
        type: ObjectId,
        required: true,
    },
    min_experience: {
        type: String,
        required: true,
    },
    max_experience: {
        type: String,
        required: true,
    },
    min_salary: {
        type: Number,
        required: true,
    },
    max_salary: {
        type: Number,
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