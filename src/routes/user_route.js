let express = require('express');
let router = express.Router();
let func = require('../config/function');
const userController = require('../controllers/user_controller');
router.post(func.urlCons.URL_USER_REGISTRATION, userController.userRegistration);
router.post(func.urlCons.URL_USER_LOGIN, userController.userLogin);
router.post(func.urlCons.URL_LINKED_LOGIN, userController.linkedInLogin);
module.exports = router;