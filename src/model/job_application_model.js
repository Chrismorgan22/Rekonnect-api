const { ObjectId } = require('bson');
let mongoose = require('mongoose');
let jobApplicationSchema = new mongoose.Schema({
    candidate_id: {
        type: ObjectId,
        required: true,
    },
    job_id: {
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
module.exports = mongoose.model('job_application_details', jobApplicationSchema)