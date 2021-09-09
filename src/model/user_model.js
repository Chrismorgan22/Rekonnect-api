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
    company_name: {
        type: String,
        required: true,
    },
    password: {
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
module.exports = mongoose.model('user_details', userSchema)