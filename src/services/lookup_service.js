const func = require("../config/function");
const LookupSchema = require("../model/lookup_model");

const getCountryService = async (body) => {
  return new Promise(async (resolve, reject) => {
    let query = {};

    query = {
      $and: [{ is_deleted: false }, { lookup_type: body.lookup_type }],
    };

    await LookupSchema.find(query, function (err, docs) {
      console.log(err, docs);
      if (err) {
        func.msCons.errorJson["message"] = "Error in retrieving data";
        func.msCons.errorJson["error"] = err;
        return resolve(func.msCons.errorJson);
      } else if (!docs || docs.length === 0) {
        func.msCons.errorJson["message"] = "Error in retrieving data";
        func.msCons.errorJson["error"] = err;
        return resolve(func.msCons.errorJson);
      } else {
        func.msCons.successJson["data"] = docs;
        return resolve(func.msCons.successJson);
      }
    }).sort({ name: 1 });
  });
};
module.exports = { getCountryService };
