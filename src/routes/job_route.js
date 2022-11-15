let express = require("express");
let router = express.Router();
let func = require("../config/function");
let jobModel = require("../model/job_model");
let jobApplicantModel = require("../model/job_application_model");
const employerModel = require("../model/employer_model");
const jobController = require("../controllers/job_controller");
router.post(func.urlCons.URL_POST_JOB, jobController.postJob);
router.post(func.urlCons.URL_GET_JOB, jobController.getJob);
router.post(func.urlCons.URL_GET_JOBV2, jobController.getJobV2);
router.post(func.urlCons.URL_FILTER_JOB, jobController.filterJob);
router.get(func.urlCons.URL_GET_JOB_DETAILS, jobController.getJobDetails);

router.get(func.urlCons.URL_GET_ALL_JOBS, jobController.getAllJobs);
router.get("/getJobsPosted/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const listOfJobs = await jobModel.find({ user_id: req.params.id });

    return res.status(200).json(listOfJobs);
  } catch (error) {
    return res.status(500).json(error);
  }
});
router.post("/updateJob/:id", async (req, res) => {
  try {
    const updatedJob = await jobModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    return res.status(200).json("updated job");
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
});
router.delete("/deleteJobById/:id", async (req, res) => {
  try {
    await jobModel.findByIdAndDelete(req.params.id);
    return res.status(200).json("resourse deleted");
  } catch (error) {
    return res.status(500).json(error);
  }
});
router.get("/getJobApplied/:id", async (req, res) => {
  try {
    const list = await jobApplicantModel.find({
      candidate_id: req.params.id,
    });

    return res.status(200).json(list);
  } catch (e) {
    return res.status(500).json(e.message);
  }
});

router.get("/entireDetails/:id", async (req, res) => {
  try {
    const fetched = await jobModel
      .findOne({ _id: req.params.id })
      .populate("user_id");

    const { company_logo, company_name, ...rest } = await employerModel.findOne(
      {
        user_id: fetched.user_id._id,
      }
    );
    return res.status(202).json({ data: fetched, company_logo, company_name });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

router.get("/searchJob", async (req, res) => {
  try {
    const searchTerm = req.query.search;
    const fetchedJobs = await jobModel.find({
      $or: [
        { job_title: { $regex: searchTerm, $options: "i" } },
        { job_description: { $regex: searchTerm, $options: "i" } },
      ],
    });

    return res.status(200).json(fetchedJobs);
  } catch (e) {
    return res.status(500).json({ error: `error caused due to ${e.message}` });
  }
});
module.exports = router;
