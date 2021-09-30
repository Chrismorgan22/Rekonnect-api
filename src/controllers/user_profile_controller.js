const userProfileService = require('../services/user_profile_service');
const func = require('../config/function');
const updateUserProfile = async (req, res) => {
    try {
        const updateUserProfileData = await userProfileService.updateUserProfileService(req)
        console.log(updateUserProfileData)
        return res.send(updateUserProfileData)
    } catch (err) {
        return res.send(err)
    }

}
const getUserProfile = async (req, res) => {
    try {
        const getUserProfileData = await userProfileService.getUserProfileService(req)
        console.log(getUserProfileData)
        return res.send(getUserProfileData)
    } catch (err) {
        return res.send(err)
    }

}

// const filterJob = async (req, res) => {
//     try {
//         const getJobData = await userProfileService.filterUserProfileService(req)
//         console.log(getJobData)
//         return res.send(getJobData)
//     } catch (err) {
//         return res.send(err)
//     }

// }

module.exports = { updateUserProfile, getUserProfile }