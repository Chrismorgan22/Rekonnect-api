const router = require("express").Router();
let { urlCons } = require("../config/function");
let mentor_controller = require("../controllers/mentor_controller");

router.get(urlCons.URL_MENTOR_FETCH, mentor_controller.fetchMentor);
router.post(urlCons.URL_MENTOR_REGISTRATION, mentor_controller.mentorRegistrationV2);
router.get(urlCons.URL_MENTOR_PROFILE, mentor_controller.getMentor);
router.post(urlCons.URL_BOOKING, mentor_controller.createBooking);
router.post(urlCons.URL_ADD_MEET_LINK, mentor_controller.addMeetLink);
router.post(urlCons.URL_GET_MENTOR_SLOT, mentor_controller.getSlot);
router.post(urlCons.URL_SET_MENTOR_SLOT, mentor_controller.setSlot);
router.post(urlCons.URL_GET_MENTOR_BOOKING, mentor_controller.getBooking);
//
router.post(urlCons.URL_MENTOR_BOOKING_ADD, mentor_controller.addBooking);
module.exports = router;
