const mentorModel = require("../model/mentor_model");
const bookingModel = require("../model/booking_model");
const registerMentor = async (req, res) => {
  const newMentor = new mentorModel(req.body);

  try {
    const savedMentor = await newMentor.save();

    return res
      .status(200)
      .json({ message: "Mentor registered succesfully", data: savedMentor });
  } catch (error) {
    return res
      .status(500)
      .json({ message: ` Error caused due to ${error.message}` });
  }
};
const addBooking = async (req, res) => {
  const { bookingData, mentorId } = req.body;
  try {
    //first create  a new collection of booking.
    const newBooking = new bookingModel(bookingData);

    const savedBooking = await newBooking.save();
    //extract the _id from the booking and store in bookings arr in mentor schema
    const { _id, ...rest } = savedBooking;
    const mentor = await mentorModel.findOne({ _id: mentorId });
    if (mentor.booking == null) {
      mentor.booking = [];
    }
    mentor?.bookings?.push(_id);
    const savedMentor = await mentor.save();

    return res.status(200).json({
      message: "Booking created",
      data: savedMentor,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: `error caused due to ${error.message}` });
  }
};
const fetchMentor = async (req, res) => {
  try {
    const fetchedMentor = await mentorModel
      .findOne({ user_id: req.params.id })
      .populate("user_id", "bookings")
      .populate({ path: "bookings", popluate: "user_id" });
    return res.status(200).json(fetchedMentor);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { registerMentor, fetchMentor, addBooking };
