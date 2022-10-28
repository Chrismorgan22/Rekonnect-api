const userService = require("../services/user_service");
const userModel = require("../model/user_model");
const func = require("../config/function");
const paginatedResults = require("../middleware/paginate_result");
const userRegistration = async (req, res) => {
  try {
    console.log("req body", req.body);
    const registerData = await userService.userRegisterService(req.body);
    console.log("registerdata", registerData);
    return res.send(registerData);
  } catch (err) {
    return res.send(err);
  }
};

const userLogin = async (req, res) => {
  try {
    console.log(req.body);
    const loginData = await userService.userLoginService(req.body);
    console.log(loginData);
    return res.send(loginData);
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
const getUserList = async (req, res) => {
  try {
    const userData = await userService.getUserListService(req);
    console.log(userData);
    return res.send(userData);
  } catch (err) {
    return res.send(err);
  }
};

const tempUserRegister = async (req, res) => {
  try {
    const tempRegisterData = await userService.tempUserRegisterService(
      req.body
    );
    console.log(tempRegisterData);
    return res.send(tempRegisterData);
  } catch (err) {
    return res.send(err);
  }
};
const getTempUserData = async (req, res) => {
  try {
    const userData = await userService.getTempUserDataService(req.body);
    console.log(userData);
    return res.send(userData);
  } catch (err) {
    return res.send(err);
  }
};
const updateUserRegisterStatus = async (req, res) => {
  try {
    const userData = await userService.updateUserRegisterService(req.body);
    console.log(userData);
    return res.send(userData);
  } catch (err) {
    return res.send(err);
  }
};

const filterUser = async (req, res) => {
  try {
    const fetchedUser = await userModel.find({
      first_name: { $regex: req.body.search, $options: "i" },
    });

    return res.status(200).json(fetchedUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const paginateUsers = (req, res) => {
  console.log(req.body);
  res.json(res.paginatedResults);
};

module.exports = {
  userRegistration,
  userLogin,
  paginateUsers,
  linkedInLogin,
  filterUser,
  getUserList,
  tempUserRegister,
  getTempUserData,
  updateUserRegisterStatus,
};
