const func = require('../config/function');
const SpecializationSchema = require('../model/specialization_model');
const { ObjectId } = require('bson');

const getSpecializationService = async () => {
    return new Promise(async (resolve, reject) => {
        let query = {};

        query = {
            $match: {
                is_deleted: false
            }
        }
        console.log('ssssssssssss')
        await SpecializationSchema.find(query, function (err, docs) {
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
                func.msCons.successJson['data'] = docs;
                return resolve(func.msCons.successJson)
            }
        });
    })
}
module.exports = { getSpecializationService }