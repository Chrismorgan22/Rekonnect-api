const jobApplicationService = require("../services/job_application_service");
const func = require("../config/function");
const jobModel = require("../model/job_model");
const applyJob = async (req, res) => {
  try {
    const applyJobData = await jobApplicationService.applyJobService(req.body);
    console.log(applyJobData);
    return res.send(applyJobData);
  } catch (err) {
    return res.send(err);
  }
};
const appliedJobStatus = async (req, res) => {
  try {
    const applyJobData = await jobApplicationService.appliedJobStatusService(
      req.body
    );
    console.log(applyJobData);
    return res.send(applyJobData);
  } catch (err) {
    return res.send(err);
  }
};
const getUserByJob = async (req, res) => {
  try {
    const getJobData = await jobApplicationService.getUserDetailsByJobService(
      req
    );
    console.log(getJobData);
    return res.send(getJobData);
  } catch (err) {
    return res.send(err);
  }
};

const getApplicant = async (req, res) => {
  try {
    const applicant = await jobModel.find({ candidate_id: req.params.id });

    const isPresent = applicant.length !== 0;
    return res.status(200).json(isPresent);
  } catch (error) {
    return res.status(500).json(error);
  }
};
// const getJob = async (req, res) => {
//     try {
//         const getJobData = await jobApplicationService.getJobService(req)
//         console.log(getJobData)
//         return res.send(getJobData)
//     } catch (err) {
//         return res.send(err)
//     }

// }

// const filterJob = async (req, res) => {
//     try {
//         const getJobData = await jobApplicationService.filterJobService(req)
//         console.log(getJobData)
//         return res.send(getJobData)
//     } catch (err) {
//         return res.send(err)
//     }

// }

module.exports = { applyJob, appliedJobStatus, getUserByJob, getApplicant };
