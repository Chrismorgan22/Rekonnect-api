let express = require('express');
let router = express.Router();
let func = require('../config/function');
const expertController = require('../controllers/expert_controller');
router.post(func.urlCons.URL_EXPERT_REGISTRATION, expertController.expertRegistration);
router.post(func.urlCons.URL_EXPERT_LOGIN, expertController.expertLogin);
module.exports = router;