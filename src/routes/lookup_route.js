let express = require('express');
let router = express.Router();
let func = require('../config/function');
const lookupController = require('../controllers/lookup_controller');
router.post(func.urlCons.URL_GET_LOOKUP, lookupController.getLookupDetails);
module.exports = router;