const func = require('../config/function');

const UserDetailSchema = require('../model/user_model');
const CandidateDetailSchema = require('../model/candidate_model');
const EmployerDetailSchema = require('../model/employer_model');
const MentorDetailSchema = require('../model/mentor_model');

const ExpertDetailSchema = require('../model/expert_model');
const { ObjectId } = require('bson');
var jwt = require('jsonwebtoken');

const getUserProfileServiceV2 = async (req) => {

    const token = req.body[0];
    var data ;
    await jwt.verify(token, 'intralogicitsolutions', async function(err, decoded) {
        if (err){
            data = err.message
    }
        const existingUser = await UserDetailSchema.findById({_id: decoded.id})
        data = existingUser;
    })
    // Search for Candidate
    const data2 = await CandidateDetailSchema.findOne({user_id: data.user_id})
    if(data2 !== null){
        return {data,data2};
    } else{
            // Search for Employer
    const data2 = await EmployerDetailSchema.findOne({user_id: data.user_id})
    if(data2 !== null){
        return {data, data2};
    } else{
                    // Search for Mentor
    const data2 = await MentorDetailSchema.findOne({user_id: data.user_id})
    if(data2 !== null){
        return {data, data2};
    } else{
        return data;
    }
    }
    }

}
 
const getUserProfileService = async (req) => {
    return new Promise(async (resolve, reject) => {
        await UserDetailSchema.aggregate([
            {
                $match: {
                    _id: new ObjectId(req.params.user_id)
                },
            },
            {  
                $lookup: {
                    from: "user_role_details",
                    localField: "_id",
                    foreignField: "user_id",
                    as: "user_role_details"
                }
            },
            {
                $lookup: {
                    from: "candidate_details",
                    localField: "_id",
                    foreignField: "user_id",
                    as: "candidate_details"
                }
            },
            {
                $lookup: {
                    from: "expert_details",
                    localField: "_id",
                    foreignField: "user_id",
                    as: "expert_details"
                }
            },
            {
                $lookup: {
                    from: "employer_details",
                    localField: "_id",
                    foreignField: "user_id",
                    as: "employer_details"
                }
            },
            {
                $lookup: {
                    from: "institute_details",
                    localField: "_id",
                    foreignField: "user_id",
                    as: "institute_details"
                }
            },
        ], function (err, docs) {
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
               /*  docs[0]['user_role'] = docs[0]['user_role_details'][0].role;
                delete (docs[0]['user_role_details']) */
                if (docs[0]['candidate_details'].length === 0) {
                    delete (docs[0]['candidate_details']);
                }
                if (docs[0]['expert_details'].length === 0) {
                    delete (docs[0]['expert_details']);
                }
                if (docs[0]['employer_details'].length === 0) {
                    delete (docs[0]['employer_details']);
                }
                if (docs[0]['institute_details'].length === 0) {
                    delete (docs[0]['institute_details']);
                }
                func.msCons.successJson['data'] = docs;
                return resolve(func.msCons.successJson)
            }
        })
    });
}

const updateUserProfileService = async (req) => {

    return new Promise(async (resolve, reject) => {
        let model = {};
        let SchemaCollection;
        console.log(req.body)
        if (req.body.role === 1) {
            model = new CandidateDetailSchema(req.body);
            SchemaCollection = CandidateDetailSchema;
        }
        // else if(req.body.role === 2){
        //     model = new EmployerSchema(req.body);
        // }
        await model.validate(async function (err, data) {
            if (err) {
                const keys = Object.keys(err.errors)
                console.log(keys)
                keys.map(ele => {
                    func.msCons.errorJson['message'] = err.errors[ele].path + ' is ' + err.errors[ele].kind
                    return resolve(func.msCons.errorJson)
                })
            } else {
                const query = { "user_id": req.params.user_id };
                const update = req.body
                await SchemaCollection.findOneAndUpdate(query, update, {
                    returnOriginal: false
                }, function (err, docs) {
                    if (err) {
                        console.log('ssssssssssss', err.errors)
                        if (err.code === 11000) {
                            Object.keys(err.keyValue)
                            func.msCons.errorJson['message'] = Object.keys(err.keyValue) + ' already exists'
                            return resolve(func.msCons.errorJson)
                        }
                    }
                    else if (!docs || docs.length === 0) {
                        func.msCons.errorJson['message'] = 'Error in updating data'
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

module.exports = { getUserProfileServiceV2, getUserProfileService, updateUserProfileService }