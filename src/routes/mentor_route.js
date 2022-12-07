const router = require("express").Router();
let { urlCons } = require("../config/function");
let mentor_controller = require("../controllers/mentor_controller");

router.get(urlCons.URL_MENTOR_FETCH, mentor_controller.fetchMentor);
router.post(urlCons.URL_MENTOR_REGISTRATION, mentor_controller.mentorRegistrationV2);
router.get(urlCons.URL_MENTOR_PROFILE, mentor_controller.getMentor);
router.post(urlCons.URL_BOOKING, mentor_controller.createBooking);
//
router.post(urlCons.URL_MENTOR_BOOKING_ADD, mentor_controller.addBooking);
module.exports = router;
