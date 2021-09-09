const specializationService = require('../services/specialization_service');
const func = require('../config/function');

const getSpecialization = async (req, res) => {
    console.log('getSpecialization')
    try {
        const specializationData = await specializationService.getSpecializationService()
        console.log(specializationData)
        return res.send(specializationData)
    } catch (err) {
        return res.send(err)
    }

}


module.exports = { getSpecialization }