const func = require('../config/function');
const JobDetailSchema = require('../model/job_model');
const { ObjectId } = require('bson');


const getJobServiceV2 = async (req) => {
    const findJob = await JobDetailSchema.find()
    return findJob
}

const postJobService = async (body) => {
    console.log(body);
    return new Promise(async (resolve, reject) => {
        let model = {};
        model = new JobDetailSchema(body);
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

const getJobService = async (req) => {
    return new Promise(async (resolve, reject) => {
        let andQuery = [{ is_deleted: false }]
        if (req.body.user_id !== undefined) {
            andQuery.push({ user_id: ObjectId(req.body.user_id) })
        }
        await JobDetailSchema.aggregate([
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
                func.msCons.errorJson["message"] = "Error in retrieving data";
                func.msCons.errorJson["error"] = err;
                return resolve(func.msCons.errorJson);
            } else {
                func.msCons.successJson['data'] = docs;
                return resolve(func.msCons.successJson)
            }
        }
        );
    });
}


const filterJobService = async (req) => {
    let query = {};
    let andQuery = [{ is_deleted: false }]
    if (req.body.job_location_id !== undefined) {
        andQuery.push({
            job_location_id: {
                $in: req.body.job_location_id
            }
        })
    }
    if (req.body.graduation_id !== undefined) {
        andQuery.push({
            graduation_id: {
                $in: req.body.graduation_id
            }
        })
    }
    if (req.body.speacialization_id !== undefined) {
        andQuery.push({
            speacialization_id: {
                $in: req.body.speacialization_id
            }
        })
    }
    if (req.body.employment_type !== undefined) {
        andQuery.push({
            employment_type:
                req.body.employment_type
        })
    }
    if (req.body.min_salary !== undefined) {
        andQuery.push({
            min_salary: {
                $gte: req.body.min_salary
            }
        })
    }
    if (req.body.max_salary !== undefined) {
        andQuery.push({
            max_salary: {
                $lte: req.body.max_salary
            }
        })
    }

    query = {
        $and: andQuery
    };
    return new Promise(async (resolve, reject) => {
        await JobDetailSchema.find(
            query,
        ).skip(Number(req.query.skip)).limit(Number(req.query.limit)).exec(function (err, docs) {
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
        }
        );
    });
}
const getJobDetailsService = async (req) => {
    return new Promise(async (resolve, reject) => {
        let andQuery = [{ is_deleted: false }]
        // if (req.body.user_id !== undefined) {
        andQuery.push({ _id: ObjectId(req.params.id) })
        // }
        await JobDetailSchema.aggregate([
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
                func.msCons.errorJson["message"] = "Error in retrieving data";
                func.msCons.errorJson["error"] = err;
                return resolve(func.msCons.errorJson);
            } else {
                func.msCons.successJson['data'] = docs;
                return resolve(func.msCons.successJson)
            }
        }
        );
    });
}
module.exports = { getJobServiceV2, postJobService, getJobService, filterJobService, getJobDetailsService }