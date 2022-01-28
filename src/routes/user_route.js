let express = require("express");
let router = express.Router();
let func = require("../config/function");
let nodemailer = require("nodemailer");
const fs = require("fs");
var handlebars = require("handlebars");

let userModel = require("../model/user_model");
const userController = require("../controllers/user_controller");
const paginatedResults = require("../middleware/paginate_result");

router.post(
  func.urlCons.URL_USER_REGISTRATION,
  userController.userRegistration
);
router.post("/email", async (req, res) => {
  try {
    var transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: "reachus@rekonnect.in",
        pass: "Rekonnect@2021",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    fs.readFile("index.html", { encoding: "utf-8" }, function (err, html) {
      if (err) {
        console.log(err);
      } else {
        var template = handlebars.compile(html);
        var replacements = {
          firstName: "alroy",
          lastName: "ferns",
        };
        var htmlToSend = template(replacements);
        console.log("hello world");
        var mailOptions = {
          from: "ReKonnect India <reachus@rekonnect.in>",
          to: "alroyfernandes07518@gmail.com",
          subject: "Welcome to Rekonnect",
          html: htmlToSend,
        };
        transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            console.log(err);
          } else {
            console.log(info);
          }
          // func.msCons.successJson['data'] = docs;
          // return resolve(func.msCons.successJson)
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});
router.post(func.urlCons.URL_USER_LOGIN, userController.userLogin);
router.post(func.urlCons.URL_LINKED_LOGIN, userController.linkedInLogin);
router.get(func.urlCons.URL_USER_LIST, userController.getUserList);
router.post(
  func.urlCons.URL_TEMP_USER_DATA_SAVE,
  userController.tempUserRegister
);
router.post(
  func.urlCons.URL_GET_TEMP_USER_DATA,
  userController.getTempUserData
);
router.post(
  func.urlCons.URL_UPDATE_USER_REGISTRATION_STATUS,
  userController.updateUserRegisterStatus
);
router.get(func.urlCons.FILTER_BY_ID, async (req, res) => {
  try {
    const fetchedUser = await userModel.find({ _id: req.params.id });
    return res.status(200).json(fetchedUser);
  } catch (error) {
    return res.status(500).json(error);
  }
});
router.post("/update/:id", async (req, res) => {
  try {
    const updatedDocument = await userModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    return res.status(200).json("update success");
  } catch (error) {
    return res.status(500).json(error);
  }
});
router.post(func.urlCons.FILTER_USERS, userController.filterUser);
router.post(
  func.urlCons.PAGINATE_USERS,
  paginatedResults(userModel),
  userController.paginateUsers
);
module.exports = router;
