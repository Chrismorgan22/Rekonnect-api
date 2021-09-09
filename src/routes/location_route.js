let express = require('express');
let router = express.Router();
let func = require('../config/function');
const locationController = require('../controllers/location_controller');
router.get(func.urlCons.URL_GET_LOCATION, locationController.getLocation);
module.exports = router;