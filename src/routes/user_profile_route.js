let express = require('express'); 
let router = express.Router();
let func = require('../config/function');
const userProfileController = require('../controllers/user_profile_controller');
router.post(func.urlCons.URL_UPDATE_USER_PROFILE, userProfileController.updateUserProfile);
router.get(func.urlCons.URL_GET_USER_PROFILE, userProfileController.getUserProfile);
router.post(func.urlCons. URL_GET_USER_PROFILE_V2, userProfileController.getUserProfileV2);

// router.post(func.urlCons.URL_FILTER_JOB, userProfileController.filterJob);
module.exports = router;