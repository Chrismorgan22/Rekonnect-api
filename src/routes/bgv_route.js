const router = require("express").Router();
let func = require("../config/function");
const bgv_controller = require("../controllers/bgv_controller");
router.post(func.urlCons.POST_BGV, bgv_controller.addUser);
router.get(func.urlCons.GET_USERS, bgv_controller.fetchUsers);
router.post(func.urlCons.UPLOAD_BGV, bgv_controller.uploadPdf);
module.exports = router;
