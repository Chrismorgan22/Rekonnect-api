const jobService = require("../services/job_service");
const jobModel = require("../model/job_model");
const func = require("../config/function");
const postJob = async (req, res) => {
  try {
    const postJobData = await jobService.postJobService(req.body);
    console.log(postJobData);
    return res.send(postJobData);
  } catch (err) {
    return res.send(err);
  }
};
const getJob = async (req, res) => {
  try {
    const getJobData = await jobService.getJobService(req);
    console.log(getJobData);
    return res.send(getJobData);
  } catch (err) {
    return res.send(err);
  }
};

const getJobV2 = async (req, res) => {
  try {
    const getJobData = await jobService.getJobServiceV2(req);
    return res.send(getJobData);
  } catch (err) {
    return res.send(err);
  }
};

const filterJob = async (req, res) => {
  try {
    const getJobData = await jobService.filterJobService(req);
    console.log(getJobData);
    return res.send(getJobData);
  } catch (err) {
    return res.send(err);
  }
};

const getJobDetails = async (req, res) => {
  try {
    const getJobData = await jobService.getJobDetailsService(req);
    console.log(getJobData);
    return res.send(getJobData);
  } catch (err) {
    return res.send(err);
  }
};
const getAllJobs = async (req, res) => {
  try {
    const allJobs = await jobModel.find({}).populate("user_id");
    return res.status(200).json(allJobs);
  } catch (error) {
    return res.status(500).json(error);
  }
};
module.exports = { getJobV2, postJob, getJob, filterJob, getJobDetails, getAllJobs };
