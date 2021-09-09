const graduationService = require('../services/graduation_service');
const func = require('../config/function');

const getGraduation = async (req, res) => {
    console.log('getGraduation')
    try {
        const graduationData = await graduationService.getGraduationService()
        console.log(graduationData)
        return res.send(graduationData)
    } catch (err) {
        return res.send(err)
    }

}


module.exports = { getGraduation }