const candidateService = require("../services/candidate_service");
const { helperExport } = require("./exportToExcel");
const func = require("../config/function");

const candidateRegistration = async (req, res) => {
  try {
    const registerData = await candidateService.candidateRegisterService(
      req.body
    );
    console.log(registerData.user_id);
    helperExport(req.body.user_id);
    return res.send(registerData);
  } catch (err) {
    return res.send(err);
  }
};

const candidateRegistrationV2 = async (req, res) => {
  try {
    const registerData = await candidateService.candidateRegisterV2(
      req.body
    );
    /* helperExport(req.body.user_id); */
    return res.send(registerData);
  } catch (err) {
    return res.status(400).json(`${err.message}`);
  }
};

const candidateLogin = async (req, res) => {
  try {
    console.log(req.body);
    const loginData = await candidateService.candidateLoginService(req.body);
    console.log(loginData);
    return res.send(loginData);
  } catch (err) {
    return res.send(err);
  }
};

const candidateLoginV2 = async (req, res) => {
  try {
    const loginData = await candidateService.candidateLoginV2(req.body);
    return res.send(loginData);
  } catch (err) {
    return res.status(400).json(`${err.message}`);
  }
};

const getCandidateList = async (req, res) => {
  try {
    const candidateData = await candidateService.getCandidateListService();
    console.log(candidateData);
    return res.send(candidateData);
  } catch (err) {
    return res.send(err);
  }
};

const linkedInLogin = async (req, res) => {
  try {
    const candidateData = await candidateService.linkedInLoginService(req.body);
    console.log(candidateData);
    const candidateLinkedInData =
      await candidateService.linkedInCandidateDataService(candidateData);
    const candidateEmailData = await candidateService.linkedInCandidateEmail(
      candidateData
    );
    console.log(
      candidateEmailData.elements[0]["handle~"],
      candidateLinkedInData
    );
    const finalJson = await getFinalJson(
      candidateEmailData,
      candidateLinkedInData
    );
    console.log(finalJson);
    func.msCons.successJson["data"] = finalJson;
    return res.send(func.msCons.successJson);
    return res.send(finalJson);
  } catch (err) {
    return res.send(err);
  }
};
const getFinalJson = async (candidateEmailData, candidateLinkedInData) => {
  const json = {};
  json["first_name"] = candidateLinkedInData.localizedFirstName;
  json["last_name"] = candidateLinkedInData.localizedLastName;
  json["email"] = candidateEmailData.elements[0]["handle~"].emailAddress;
  return json;
};

module.exports = {
  candidateRegistration,
  candidateRegistrationV2,
  candidateLoginV2,
  candidateLogin,
  getCandidateList,
  linkedInLogin,
};
