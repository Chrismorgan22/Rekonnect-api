let express = require("express");
let router = express.Router();
let func = require("../config/function");
let jobModel = require("../model/job_model");
const jobController = require("../controllers/job_controller");
router.post(func.urlCons.URL_POST_JOB, jobController.postJob);
router.post(func.urlCons.URL_GET_JOB, jobController.getJob);
router.post(func.urlCons.URL_FILTER_JOB, jobController.filterJob);
router.get(func.urlCons.URL_GET_JOB_DETAILS, jobController.getJobDetails);

router.get(func.urlCons.URL_GET_ALL_JOBS, jobController.getAllJobs);
module.exports = router;
