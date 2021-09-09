let express = require('express');
let router = express.Router();
let func = require('../config/function');
const candidateController = require('../controllers/candidate_controller');
router.post(func.urlCons.URL_CANDIDATE_REGISTRATION, candidateController.candidateRegistration);
router.post(func.urlCons.URL_CANDIDATE_LOGIN, candidateController.candidateLogin);
module.exports = router;