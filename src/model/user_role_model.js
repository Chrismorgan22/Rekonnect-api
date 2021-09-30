const { ObjectId } = require('bson');
let mongoose = require('mongoose');
let userRoleSchema = new mongoose.Schema({
    user_id: {
        type: ObjectId,
        required: true,
    },
    role: {
        type: Number,
        required: true,
        default: 1
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
module.exports = mongoose.model('user_role_details', userRoleSchema)