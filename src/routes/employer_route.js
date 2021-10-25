let express = require('express');
let router = express.Router();
let func = require('../config/function');
const employerController = require('../controllers/employer_controller');
router.post(func.urlCons.URL_EMPLOYER_REGISTRATION, employerController.employerRegistration);
module.exports = router;