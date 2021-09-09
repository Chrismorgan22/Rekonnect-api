const userService = require('../services/user_service');
const func = require('../config/function');
const userRegistration = async (req, res) => {
    try {
        const registerData = await userService.userRegisterService(req.body)
        console.log(registerData)
        return res.send(registerData)
    } catch (err) {
        return res.send(err)
    }

}

const userLogin = async (req, res) => {
    try {
        console.log(req.body)
        const loginData = await userService.userLoginService(req.body)
        console.log(loginData)
        return res.send(loginData)
    } catch (err) {
        return res.send(err)
    }

}
module.exports = { userRegistration, userLogin }