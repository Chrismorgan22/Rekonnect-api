const { model, Schema } = require("mongoose");

const mentorSchema = new Schema({
  user_id: {
    type: String,
    ref: "user_details",
  },
  expertise: [
    {
      type: String,
    },
  ],
  address_details: {
    street: {
      type: String,
      required: true,
    },
    zip_code: {
      type: String,
      required: true,
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
        type: ObjectId,
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
});

module.exports = model("mentor_details", mentorSchema);
