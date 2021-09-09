let express = require('express');
let router = express.Router();
let func = require('../config/function');
const specializationController = require('../controllers/specialization_controller');
router.get(func.urlCons.URL_GET_SPECIALIZATION, specializationController.getSpecialization);
module.exports = router;