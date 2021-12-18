const router = require("express").Router();
let func = require("../config/function");
const shortid = require("shortid");
const payment_controller = require("../controllers/payment_controller");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: "rzp_test_nBBe0QbVWt2oIh",
  key_secret: "KhebpgbRB9k34YRV7nGSyXWL",
});

router.post(func.urlCons.RAZOR_PAY_VERIFICATION, payment_controller.verify);
router.post(func.urlCons.RAZOR_PAY_PAY, payment_controller.payment);
module.exports = router;
