const { ObjectId } = require("bson");
const { Schema, model } = require("mongoose");
const bookingSchemaV2 = new Schema({
  candidate_id: {
    type: ObjectId,
    ref: "candidate_details",
  },
  mentor_id: {
    type: ObjectId,
    ref: "mentor_details",
  },
  days: {
    type: Array,
  },
  time_slot: {
    type: String,
  },
  topic: {
    type: String,
  },
  amount: {
    type: Number,
  },
  video_meet_link: {
    type: String,
    default: '',
  },
  transaction_id: {
    type: String,
  },
  cancelled: {
    type: Boolean,
    default: false,
  },
  
  reschudeled_by_mentor: {
    type: Boolean,
    default: false,
  },
  reschudeled_by_candidate: {
    type: Boolean,
    default: false,
  },
});
module.exports = model("mentor_booking_v2", bookingSchemaV2);
