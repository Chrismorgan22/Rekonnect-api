let express = require("express");
let router = express.Router();
let func = require("../config/function");
let paginatedResults = require("../middleware/paginate_result");
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

router.post("/urgentJoining/:id", async (req, res) => {
  try {
    const fetched = await candidateDetails.findOne({ user_id: req.params.id });
    const updatedDocument = await fetched.update({
      $set: {
        urgentJoiningStatus: req.body.condition,
        urgentDateInput: Date.now(),
      },
    });

    return res.status(200).json("Updated!!");
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post(
  "/fetch/paginated",
  paginatedResults(candidateDetails),
  async (req, res) => {
    return res.json(res.paginatedResults);
  }
);
module.exports = router;
