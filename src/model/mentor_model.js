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
        id: {
          type: String,
        },
        name: {
          type: String,
        },
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
  },
  { timestamps: true }
);

module.exports = model("mentor_details", mentorSchema);
