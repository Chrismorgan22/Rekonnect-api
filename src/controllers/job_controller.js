const jobService = require('../services/job_service');
const func = require('../config/function');
const postJob = async (req, res) => {
    try {
        const postJobData = await jobService.postJobService(req.body)
        console.log(postJobData)
        return res.send(postJobData)
    } catch (err) {
        return res.send(err)
    }

}
const getJob = async (req, res) => {
    try {
        const getJobData = await jobService.getJobService(req)
        console.log(getJobData)
        return res.send(getJobData)
    } catch (err) {
        return res.send(err)
    }

}

const filterJob = async (req, res) => {
    try {
        const getJobData = await jobService.filterJobService(req)
        console.log(getJobData)
        return res.send(getJobData)
    } catch (err) {
        return res.send(err)
    }
}

const getJobDetails = async (req, res) => {
    try {
        const getJobData = await jobService.getJobDetailsService(req)
        console.log(getJobData)
        return res.send(getJobData)
    } catch (err) {
        return res.send(err)
    }
}
module.exports = { postJob, getJob, filterJob,getJobDetails }