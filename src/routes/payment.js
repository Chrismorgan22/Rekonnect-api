const router = require("express").Router();
let func = require("../config/function");
const payment_controller = require("../controllers/payment_controller");

router.post(func.urlCons.RAZOR_PAY_VERIFICATION, payment_controller.verify);
router.post(func.urlCons.RAZOR_PAY_PAY, payment_controller.payment);
module.exports = router;
