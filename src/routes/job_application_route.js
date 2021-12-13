let express = require('express');
let router = express.Router();
let func = require('../config/function');
const jobApplicationController = require('../controllers/job_application_controller');
router.post(func.urlCons.URL_POST_JOB_APPLICATION, jobApplicationController.applyJob);
router.post(func.urlCons.URL_APPLIED_JOB_STATUS, jobApplicationController.appliedJobStatus);
router.get(func.urlCons.URL_USER_DETAILS_BY_JOB, jobApplicationController.getUserByJob);
// router.post(func.urlCons.URL_FILTER_JOB, jobApplicationController.filterJob);
module.exports = router;