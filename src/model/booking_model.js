const { ObjectId } = require("bson");
const { Schema, model } = require("mongoose");
const bookingSchema = new Schema({
  user_id: {
    type: ObjectId,
    ref: "candidate_details",
  },
  date: {
    type: String,
  },
  start_time: {
    type: String,
  },
  end_time: {
    type: String,
  },
  topic: {
    type: String,
  },
  agenda: {
    type: String,
  },
});
module.exports = model("mentor_booking", bookingSchema);
