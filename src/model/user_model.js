const { ObjectId } = require('bson');
let mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
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
    phone: {
        type: String
    },
    google_login: {
        type: String,
    },
    facebook_login: {
        type: String,
    },
    linkedin_login: {
        type: String
    },
    password: {
        type: String
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
module.exports = mongoose.model('user_details', userSchema)