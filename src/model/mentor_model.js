const { model, Schema } = require("mongoose");
const { ObjectId } = require("bson");
const mentorSchema = new Schema(
  {
    user_id: {
      type: String,
      ref: "user_details",
    },
    user_profile: { type: String },
    expertise: [
      {
        type: String,
      },
    ],
    address_details: {
      street: {
        type: String,
      },
      zip_code: {
        type: String,
      },
      state: {
          type: String,
      },
      city: {
        id: {
          type: String,
        },
        name: {
          type: String,
        },
      },
      landmark: {
        type: String,
      },
    },
    description: {
      type: String,
    },
    company: { type: String },
    designation: { type: String },
    languages: [
      {
        type: String,
      },
    ],
    socials: {
      linkedin: { type: String },
      instagram: { type: String },
      facebook: { type: String },
    },
    bookings: [
      {
        type: ObjectId,
        ref: "mentor_booking",
      },
    ],
    available_slots : [{
      slot : [{
        start_time1: String,
        end_time1: String,
        start_time2: String,
        end_time2: String,
        start_time3: String,
        end_time3: String,
        start_time4: String,
        end_time4: String,
        start_time5: String,
        end_time5: String,
      }],
      days: {
        monday: Boolean,
        tuesday: Boolean,
        wednesday: Boolean,
        thursday: Boolean,
        friday: Boolean,
        saturday: Boolean,
        sunday: Boolean,
      },
    }],
  },
  { timestamps: true }
);

module.exports = model("mentor_details", mentorSchema);
