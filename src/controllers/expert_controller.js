const expertService = require('../services/expert_service');
const func = require('../config/function');
const expertRegistration = async (req, res) => {
    try {
        const registerData = await expertService.expertRegisterService(req.body)
        console.log(registerData)
        return res.send(registerData)
    } catch (err) {
        return res.send(err)
    }

}

const expertLogin = async (req, res) => {
    try {
        console.log(req.body)
        const loginData = await expertService.expertLoginService(req.body)
        console.log(loginData)
        return res.send(loginData)
    } catch (err) {
        return res.send(err)
    }

}
module.exports = { expertRegistration, expertLogin }