let express = require('express');
let router = express.Router();
let func = require('../config/function');
const healthController = require('../controllers/health_controller');
router.get(func.urlCons.URL_GET_HEALTH, healthController.getHealth);
module.exports = router;