const candidateService = require('../services/candidate_service');
const func = require('../config/function');
const candidateRegistration = async (req, res) => {
    try {
        const registerData = await candidateService.candidateRegisterService(req.body)
        console.log(registerData)
        return res.send(registerData)
    } catch (err) {
        return res.send(err)
    }

}

const candidateLogin = async (req, res) => {
    try {
        console.log(req.body)
        const loginData = await candidateService.candidateLoginService(req.body)
        console.log(loginData)
        return res.send(loginData)
    } catch (err) {
        return res.send(err)
    }

}
module.exports = { candidateRegistration, candidateLogin }