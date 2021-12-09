const jobApplicationService = require('../services/job_application_service');
const func = require('../config/function');
const applyJob = async (req, res) => {
    try {
        const applyJobData = await jobApplicationService.applyJobService(req.body)
        console.log(applyJobData)
        return res.send(applyJobData)
    } catch (err) {
        return res.send(err)
    }

}
const appliedJobStatus = async (req, res) => {
    try {
        const applyJobData = await jobApplicationService.appliedJobStatusService(req.body)
        console.log(applyJobData)
        return res.send(applyJobData)
    } catch (err) {
        return res.send(err)
    }

}
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

module.exports = { applyJob, appliedJobStatus }