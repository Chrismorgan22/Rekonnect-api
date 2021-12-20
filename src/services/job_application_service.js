const func = require('../config/function');
const JobApplicationSchema = require('../model/job_application_model');
const { ObjectId } = require('bson');
const applyJobService = async (body) => {
    console.log(body);
    return new Promise(async (resolve, reject) => {
        let model = {};
        model = new JobApplicationSchema(body);
        await model.validate(async function (err, data) {
            if (err) {
                const keys = Object.keys(err.errors)
                console.log(keys)
                keys.map(ele => {
                    func.msCons.errorJson['message'] = err.errors[ele].path + ' is ' + err.errors[ele].kind
                    return resolve(func.msCons.errorJson)
                })
            } else {
                await model.save(function (err, docs) {
                    if (err) {
                        console.log('ssssssssssss', err.errors)
                        if (err.code === 11000) {
                            Object.keys(err.keyValue)
                            func.msCons.errorJson['message'] = Object.keys(err.keyValue) + ' already exists'
                            return resolve(func.msCons.errorJson)
                        }
                    }
                    else if (!docs || docs.length === 0) {
                        func.msCons.errorJson['message'] = 'Error in inserting data'
                        func.msCons.errorJson['error'] = err
                        return resolve(func.msCons.errorJson)
                    } else {
                        func.msCons.successJson['data'] = docs;
                        return resolve(func.msCons.successJson)
                    }
                });
            }
        });
    })
}

const appliedJobStatusService = async (body) => {
    return new Promise(async (resolve, reject) => {
        let andQuery = [{ is_deleted: false }]
        // if (req.body.user_id !== undefined) {
        andQuery.push({ candidate_id: ObjectId(body.candidate_id) })
        andQuery.push({ job_id: ObjectId(body.job_id) })
        // }
        await JobApplicationSchema.aggregate([
            {
                $match: {
                    $and: andQuery,
                }
            }
        ]).exec(function (err, docs) {
            console.log(err, docs);
            if (err) {
                func.msCons.errorJson["message"] = "Error in retrieving data";
                func.msCons.errorJson["error"] = err;
                return resolve(func.msCons.errorJson);
            } else if (!docs || docs.length === 0) {
                func.msCons.successJson["message"] = "No data found";
                func.msCons.successJson["data"] = [];
                return resolve(func.msCons.successJson);
            } else {
                func.msCons.successJson['data'] = docs;
                return resolve(func.msCons.successJson)
            }
        }
        );
    });
}
const getUserDetailsByJobService = async (req) => {
    return new Promise(async (resolve, reject) => {
        let query = [];
        query = [
            {
                $match: {
                    "job_id": ObjectId(req.query.job_id),
                }
            },
            {
                $lookup:
                {
                    "from": "user_details",
                    "localField": "candidate_id",
                    "foreignField": "_id",
                    "as": "userByJob"
                }
            },
            {
                $lookup:
                {
                    "from": "candidate_details",
                    "localField": "candidate_id",
                    "foreignField": "user_id",
                    "as": "candidatebyjob"
                }
            },
            {
                $project: {
                    "userByJob.first_name": 1,
                    "userByJob.last_name": 1,
                    "userByJob.email": 1,
                    "userByJob.phone": 1,
                    "candidatebyjob.address_details": 1,
                    "candidatebyjob.education_data": 1,
                    "candidatebyjob.experience_data": 1,
                }
            }
        ]
        await JobApplicationSchema.aggregate(query).exec(function (err, docs) {
            console.log(err, docs);
            if (err) {
                func.msCons.errorJson["message"] = "Error in retrieving data";
                func.msCons.errorJson["error"] = err;
                return resolve(func.msCons.errorJson);
            } else if (!docs || docs.length === 0) {
                func.msCons.successJson["message"] = "No data found";
                func.msCons.successJson["data"] = [];
                return resolve(func.msCons.successJson);
            } else {
                func.msCons.successJson['data'] = docs;
                return resolve(func.msCons.successJson)
            }
        }
        );
    });
}
// const filterJobService = async (req) => {
//     let query = {};
//     let andQuery = [{ is_deleted: false }]
//     if (req.body.job_location_id !== undefined) {
//         andQuery.push({
//             job_location_id: {
//                 $in: req.body.job_location_id
//             }
//         })
//     }
//     if (req.body.graduation_id !== undefined) {
//         andQuery.push({
//             graduation_id: {
//                 $in: req.body.graduation_id
//             }
//         })
//     }
//     if (req.body.speacialization_id !== undefined) {
//         andQuery.push({
//             speacialization_id: {
//                 $in: req.body.speacialization_id
//             }
//         })
//     }
//     if (req.body.employment_type !== undefined) {
//         andQuery.push({
//             employment_type:
//                 req.body.employment_type
//         })
//     }
//     if (req.body.min_salary !== undefined) {
//         andQuery.push({
//             min_salary: {
//                 $gte: req.body.min_salary
//             }
//         })
//     }
//     if (req.body.max_salary !== undefined) {
//         andQuery.push({
//             max_salary: {
//                 $lte: req.body.max_salary
//             }
//         })
//     }

//     query = {
//         $and: andQuery
//     };
//     return new Promise(async (resolve, reject) => {
//         await JobApplicationSchema.find(
//             query,
//         ).skip(Number(req.query.skip)).limit(Number(req.query.limit)).exec(function (err, docs) {
//             console.log(err, docs);
//             if (err) {
//                 func.msCons.errorJson["message"] = "Error in retrieving data";
//                 func.msCons.errorJson["error"] = err;
//                 return resolve(func.msCons.errorJson);
//             } else if (!docs || docs.length === 0) {
//                 func.msCons.errorJson["message"] = "Error in retrieving data";
//                 func.msCons.errorJson["error"] = err;
//                 return resolve(func.msCons.errorJson);
//             } else {
//                 func.msCons.successJson['data'] = docs;
//                 return resolve(func.msCons.successJson)
//             }
//         }
//         );
//     });
// }
module.exports = { applyJobService, appliedJobStatusService, getUserDetailsByJobService }