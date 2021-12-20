const router = require("express").Router();
let func = require("../config/function");
const bgv_controller = require("../controllers/bgv_controller");
router.post(func.urlCons.POST_BGV, bgv_controller.addUser);
router.get(func.urlCons.GET_USERS, bgv_controller.fetchUsers);
module.exports = router;
