const mentorModel = require("../model/mentor_model");
const bookingModel = require("../model/booking_model");
const mentorService = require("../services/mentor_service");
const userModel = require("../model/user_model");


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


const mentorRegistrationV2 = async (req, res) => {
  try {
    const registerData = await mentorService.mentorRegisterV2(
      req.body
    );
    return res.send(registerData);
  } catch (err) {
    return res.send(err);
  }
};

const getMentor = async (req, res) => {
  try {
    var resultArray = []



    const findMentor = await mentorModel.find()
    
    for (var i = 0; i < findMentor.length; i++) { 
      
      var resultObj = {
        firstName: '',
        lastName: '',
        experties: '',
        desc: '',
        mentorId: '',
        available_slots : [],
        }

      resultObj.available_slots = findMentor[i].available_slots; 
      resultObj.mentorId = findMentor[i]._id;
      const findUser = await userModel.findById({_id: findMentor[i].user_id})

        resultObj.firstName = findUser.first_name;
        resultObj.lastName = findUser.last_name;
        resultObj.desc = 'Im a web developer with experties in nodejs ' // desc not working
        resultObj.experties = 'Node.js '
        resultArray.push(resultObj);
    }
    return res.send(resultArray);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const mentorLoginV2 = async (req, res) => {
  try {
    const loginData = await mentorService.mentorLoginV2(req.body);
    return res.send(loginData);
  } catch (err) {
    return res.status(400).json(`${err.message}`);
  }
};


const addBooking = async (req, res) => {
  const { bookingData, mentorId } = req.body;
  console.log(mentorId);
  try {
    //first create  a new collection of booking.
    const newBooking = new bookingModel(bookingData);

    const savedBooking = await newBooking.save();
    //extract the _id from the booking and store in bookings arr in mentor schema
    const { _id, ...rest } = savedBooking;
    const mentor = await mentorModel.findOne({ user_id: mentorId });
    console.log(mentor);
    if (mentor?.bookings == null) {
      mentor.bookings = [];
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
      .populate({
        path: "bookings",
      });
    return res.status(200).json(fetchedMentor);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const createBooking = async (req, res) => {
  try {
    const registerData = await mentorService.createBooking(
      req
    );
    return res.send(registerData);
  } catch (err) {
    return res.send(err);
  }
};

const addMeetLink = async (req, res) => {
  try {
    const registerData = await mentorService.addMeetLink(
      req
    );
    
    return res.send(registerData);
  } catch (err) {
    return res.send(err);
  }
};

const setSlot = async (req, res) => {
  try {
    const registerData = await mentorService.setSlot(
      req
    );
    
    return res.send(registerData);
  } catch (err) {
    return res.send(err);
  }
};

const getSlot = async (req, res) => {
  try {
    const registerData = await mentorService.getSlot(
      req
    );
    
    return res.send(registerData);
  } catch (err) {
    return res.send(err);
  }
};

const getBooking = async (req, res) => {
  try {
    const registerData = await mentorService.getBooking(
      req
    );
    
    return res.send(registerData);
  } catch (err) {
    return res.send(err);
  }
};


module.exports = { getBooking, getSlot, setSlot, addMeetLink, createBooking, getMentor, mentorLoginV2, mentorRegistrationV2, registerMentor, fetchMentor, addBooking };
