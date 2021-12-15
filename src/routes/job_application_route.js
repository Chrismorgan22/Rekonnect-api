let express = require("express");
let router = express.Router();

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

// router.post(func.urlCons.URL_FILTER_JOB, jobApplicationController.filterJob);
module.exports = router;
