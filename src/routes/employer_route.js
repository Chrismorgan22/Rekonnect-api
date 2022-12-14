let express = require("express");
const employerModel = require("../model/employer_model");
let router = express.Router();
let func = require("../config/function");
const employerController = require("../controllers/employer_controller");
router.post(
  func.urlCons.URL_EMPLOYER_REGISTRATION,
  employerController.employerRegistrationV2
);
router.get("/findById/:id", async (req, res) => {
  try {
    const fetchedUser = await employerModel.find({ user_id: req.params.id });
    return res.status(200).json(fetchedUser);
  } catch (error) {
    return res.status(500).json(error);
  }
});
module.exports = router;
