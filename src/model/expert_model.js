const { ObjectId } = require('bson');
let mongoose = require('mongoose');
let expertSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    middle_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    specialization_domain: {
        type: String,
        required: true
    },
    companies_worked_in: [{
        type: String
    }],
    experience: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    highest_education: {
        type: String,
        required: true
    },
    institute_name: {
        type: String,
        required: true
    },
    skills: [{
        type: String
    }],
    entrepreneurial_experience: {
        type: Boolean,
        required: true
    },
    social_links: [{
        type: String
    }],
    availability: [{
        date: {
            type: Date,
            required: true,
        },
        start_time: {
            type: String,
            required: true,
        },
        end_time: {
            type: String,
            required: true,
        }
    }],
    prefered_method_session: {
        type: String,
        required: true,
    },
    profile_img: {
        type: String,
        required: true,
    },
    video_url: {
        type: String,
    },
    fee: {
        type: String,
    },
    description_rekonnect: {
        type: String
    },
    mobile_number: {
        type: String,
        required: true,
    },
    token: {
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
module.exports = mongoose.model('expert_details', expertSchema)