let express = require("express");
let router = express.Router();
const { ObjectId } = require("bson");

let func = require("../config/function");
const jobApplication = require("../model/job_application_model");
const jobApplicationController = require("../controllers/job_application_controller");
router.post(
  func.urlCons.URL_POST_JOB_APPLICATION,
  jobApplicationController.applyJob
);
router.post(
  func.urlCons.URL_APPLIED_JOB_STATUS,
  jobApplicationController.appliedJobStatus
);
router.get(func.urlCons.URL_GET_JOB_APPLICATION, async (req, res) => {
  try {
    const applicants = await jobApplication.find();
    return res.status(200).json(applicants);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post(
  func.urlCons.URL_GET_APPLICANT,
  jobApplicationController.getApplicant
);
router.post("/applyForJob", async (req, res) => {
  try {
    const newApplication = new jobApplication(req.body);
    const savedApplication = await newApplication.save();
    console.log(savedApplication);
    return res.status(200).json(savedApplication);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});
router.post("/getUserByJob", async (req, res) => {
  console.log(req.body);
  try {
    const applied = await jobApplication.find({
      job_id: req.body.job_id,
    });

    return res.status(200).json(applied);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// router.post(func.urlCons.URL_FILTER_JOB, jobApplicationController.filterJob);
module.exports = router;
