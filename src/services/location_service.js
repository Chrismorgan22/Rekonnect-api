const func = require('../config/function');
const LocationSchema = require('../model/location_model');
const { ObjectId } = require('bson');

const getLocationService = async () => {
    return new Promise(async (resolve, reject) => {
        let query = {};

        query = {
            $match: {
                is_deleted: false
            }
        }
        await LocationSchema.find(query, function (err, docs) {
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
module.exports = { getLocationService }