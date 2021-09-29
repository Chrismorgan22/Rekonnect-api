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

const linkedInLogin = async (req, res) => {
    try {
        const candidateData = await candidateService.linkedInLoginService(req.body)
        console.log(candidateData)
        const candidateLinkedInData = await candidateService.linkedInCandidateDataService(candidateData)
        const candidateEmailData = await candidateService.linkedInCandidateEmail(candidateData);
        console.log(candidateEmailData.elements[0]['handle~'], candidateLinkedInData)
        const finalJson = await getFinalJson(candidateEmailData, candidateLinkedInData);
        console.log(finalJson);
        func.msCons.successJson['data'] = finalJson;
        return res.send(func.msCons.successJson)
        return res.send(finalJson)
    } catch (err) {
        return res.send(err)
    }
}
const getFinalJson = async (candidateEmailData, candidateLinkedInData) => {
    const json = {};
    json['first_name'] = candidateLinkedInData.localizedFirstName;
    json['last_name'] = candidateLinkedInData.localizedLastName;
    json['email'] = candidateEmailData.elements[0]['handle~'].emailAddress;
    return json;
}
module.exports = { userRegistration, userLogin, linkedInLogin }