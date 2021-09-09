let express = require('express');
let router = express.Router();
let func = require('../config/function');
const graduationController = require('../controllers/graduation_controller');
router.get(func.urlCons.URL_GET_GRADUATION, graduationController.getGraduation);
module.exports = router;