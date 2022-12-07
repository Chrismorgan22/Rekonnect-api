const employerService = require('../services/employer_service');
const func = require('../config/function');
const employerRegistration = async (req, res) => {
    try {
        const registerData = await employerService.employerRegisterService(req.body)
        console.log(registerData)
        return res.send(registerData)
    } catch (err) {
        return res.send(err)
    }

}

const employerRegistrationV2 = async (req, res) => {
    try {
        const registerData = await employerService.employerRegisterServiceV2(req.body)
        return res.send(registerData)
    } catch (err) {
        return res.status(400).json(`${err.message}`);
    }

}

const employerLoginV2 = async (req, res) => {
    try {
      const loginData = await employerService.employerLoginV2(req.body);
      return res.send(loginData);
    } catch (err) {
      return res.status(400).json(`${err.message}`);
    }
  };

module.exports = { employerLoginV2, employerRegistration,employerRegistrationV2 }