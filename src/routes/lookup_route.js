let express = require("express");
let router = express.Router();
let lookupModel = require("../model/lookup_model");
let func = require("../config/function");
const lookupController = require("../controllers/lookup_controller");
router.post(func.urlCons.URL_GET_LOOKUP, lookupController.getLookupDetails);

router.post(func.urlCons.URL_STORE_LOOKUP, lookupController.postCarrerOptions);

// router.post("/sorted", async (req, res) => {
//   try {
//     const sortedFields = await lookupModel
//       .find({
//         lookup_type: req.body.lookup_type,
//       })

//     return res.status(200).json(sortedFields);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// });
module.exports = router;
