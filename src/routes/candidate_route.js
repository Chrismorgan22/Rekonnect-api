let express = require("express");
let router = express.Router();
let func = require("../config/function");
const candidateDetails = require("../model/candidate_model");
const candidateController = require("../controllers/candidate_controller");
router.post(
  func.urlCons.URL_CANDIDATE_REGISTRATION,
  candidateController.candidateRegistration
);
router.post(
  func.urlCons.URL_CANDIDATE_LOGIN,
  candidateController.candidateLogin
);
router.get(
  func.urlCons.URL_GET_CANDIDATE,
  candidateController.getCandidateList
);
router.post("/update/:id", async (req, res) => {
  console.log(req.body);
  try {
    const updatedSchema = await candidateDetails.findOneAndUpdate(
      { user_id: req.params.id },
      { $set: req.body }
    );

    return res.status(200).json(updatedSchema);
  } catch (error) {
    return res.status(500).json(error);
  }
});
router.post(func.urlCons.URL_LINKED_LOGIN, candidateController.linkedInLogin);
router.get("/findById/:id", async (req, res) => {
  try {
    const fetchedDetails = await candidateDetails.findOne({
      user_id: req.params.id,
    });
    return res.status(200).json(fetchedDetails);
  } catch (error) {
    return res.status(500).json(error);
  }
});
module.exports = router;
