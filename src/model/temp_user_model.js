const { ObjectId } = require('bson');
let mongoose = require('mongoose');
let tempUserSchema = new mongoose.Schema({
    user_token: {
        type: String,
        required: true,
        unique: true
    },
    user_id: {
        type: ObjectId,
        required: true,
        unique: true
    },
    temp_data: {
        type: Object,
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
module.exports = mongoose.model('temp_user_details', tempUserSchema)