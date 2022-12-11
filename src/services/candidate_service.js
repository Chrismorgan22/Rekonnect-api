const func = require('../config/function');
const CandidateDetailSchema = require('../model/candidate_model');
const { ObjectId } = require('bson');
var jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
var fs = require('fs');
var handlebars = require('handlebars');
let http = require('https');
var qs = require('querystring');
const userSchema = require('../model/user_model');

const candidateSchema = require('../model/candidate_model');
const userRoleSchema = require('../model/user_role_model');
const bcrypt = require("bcrypt");
const { log } = require('console');

// const saltRounds = 10;
const salt = "$2b$12$ESEMmLu3Wn30WG.Na1RHzO";

const candidateRegisterService = async (body) => {
    console.log(body);

    return new Promise(async (resolve, reject) => {
        let model = {};
        model = new CandidateDetailSchema(body);
        await model.validate(async function (err, data) {
            console.log(err, data);
            if (err) {
                const keys = Object.keys(err.errors)
                console.log(keys)
                keys.map(ele => {
                    func.msCons.errorJson['message'] = err.errors[ele].path + ' is ' + err.errors[ele].kind
                    return resolve(func.msCons.errorJson)
                })
            } else {
                await model.save(async function (err, docs) {
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
                        const roleBody = {
                            user_id: body.user_id,
                            role: 1
                        }
                        const userRoleData = await addUserRoleData(roleBody);
                        func.msCons.successJson['data'] = docs;
                        return resolve(func.msCons.successJson)
                    }
                });
            }
        });
    })
}

const addUserRoleData = async (body) => {
    return new Promise(async (resolve, reject) => {
        let model = {};
        model = new userRoleSchema(body);
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

const candidateLoginService = async (body) => {
    console.log(body);
    let query = [];
    if (body.password !== undefined) {
        query.push({
            $and: [{
                email: body.email
            }, {
                password: body.password
            }]
        })
    } else {
        query.push({
            $and: [{
                email: body.email
            }]
        })
    }
    query.push({
        $lookup: {
            from: "user_role_details",
            localField: "user_id",
            foreignField: "_id",
            as: "question_details"
        }
    })
    console.log(query)
    return new Promise((resolve, reject) => {
        CandidateDetailSchema.find(query, function (err, docs) {
            console.log(docs, err)
            if (!docs || docs.length === 0) {
                func.msCons.notFoundJson['message'] = 'No candidate found';
                return resolve(func.msCons.notFoundJson)
            } else if (err) {
                func.msCons.errorJson['message'] = err;
                return resolve(func.msCons.errorJson)
            } else {
                var token = jwt.sign({ id: docs._id }, 'intralogicitsolutions', {
                    expiresIn: 86400 // expires in 24 hours
                });
                docs[0]['token'] = token;
                func.msCons.successJson['data'] = docs;
                return resolve(func.msCons.successJson)
            }
        });
    })
}
const getCandidateListService = async () => {
    return new Promise(async (resolve, reject) => {
        let query = {};

        query = {
            is_deleted: false
        }
        await CandidateDetailSchema.find(query, function (err, docs) {
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

const linkedInLoginService = async (body) => {
    return new Promise((resolve, reject) => {
        let options = {
            'method': 'POST',
            'hostname': 'www.linkedin.com',
            'path': "/oauth/v2/accessToken",
            'headers': {
                'content-type': 'application/x-www-form-urlencoded',
            }
        };
        let req = http.request(options, function (res) {
            // console.log(res);
            let chunks = [];
            res.on('data', function (chunk) {
                chunks.push(chunk);
            });
            res.on('end', function () {
                let body = Buffer.concat(chunks);
                return resolve(JSON.parse(body))
            });
        });
        var postData = qs.stringify(body);
        req.write(postData);
        req.end();
    })
}

const linkedInCandidateDataService = async (body) => {
    return new Promise((resolve, reject) => {
        let options = {
            'method': 'GET',
            'hostname': 'api.linkedin.com',
            'path': "/v2/me",
            'headers': {
                'Authorization': 'Bearer ' + body.access_token,
                // 'content-type': 'application/x-www-form-urlencoded',
            }
        };
        let req = http.request(options, function (res) {
            // console.log(res);
            let chunks = [];
            res.on('data', function (chunk) {
                chunks.push(chunk);
            });
            res.on('end', function () {
                let body = Buffer.concat(chunks);
                return resolve(JSON.parse(body))
            });
        });
        var postData = qs.stringify(body);
        req.write(postData);
        req.end();
    })
}

const linkedInCandidateEmail = async (body) => {
    return new Promise((resolve, reject) => {
        let options = {
            'method': 'GET',
            'hostname': 'api.linkedin.com',
            'path': "/v2/emailAddress?q=members&projection=(elements*(handle~))",
            'headers': {
                'Authorization': 'Bearer ' + body.access_token,
                // 'content-type': 'application/x-www-form-urlencoded',
            }
        };
        let req = http.request(options, function (res) {
            // console.log(res);
            let chunks = [];
            res.on('data', function (chunk) {
                chunks.push(chunk);
            });
            res.on('end', function () {
                let body = Buffer.concat(chunks);
                return resolve(JSON.parse(body))
            });
        });
        var postData = qs.stringify(body);
        req.write(postData);
        req.end();
    })
}

const candidateRegisterV2 = async(body) => {
    // Save Candidate Role in User Model
    const existingUser = await userSchema.findOne({email:body.email});
    existingUser.role = 'candidate';
    const data = await existingUser.save(); 

    // Save Candidate
   const newCandidate = new candidateSchema();
    newCandidate.user_id = body.user_id; 
   newCandidate.address_details.street = body.address_details.street;
   newCandidate.address_details.landmark = body.address_details.landmark;
   newCandidate.address_details.state = body.address_details.state;
   newCandidate.address_details.zip_code = body.address_details.zip_code;
   const data2 = await newCandidate.save();
   var token = jwt.sign({ id: data2.user_id }, 'intralogicitsolutions', {
    expiresIn: 86400 // expires in 24 hours
});

  return {data2, token, data};
}

const candidateLoginV2 = async(body) => {

    const existingUser = await userSchema.findOne({email:body.email})

    const comparePassword= await bcrypt.compare(body.password, existingUser.password)
        if(comparePassword == false)
        {
            throw new Error(`Entered Password is Wrong!`);
        }
        else {
        var token = jwt.sign({ id: existingUser._id },'intralogicitsolutions', {
        expiresIn: 86400 // expires in 24 hours
        });
        return {existingUser,token};
        }

}; 

const addWorkExp = async(body) => {
    const token = body[0];
    var data ;
    await jwt.verify(token, 'intralogicitsolutions', async function(err, decoded) {
        if (err){

            data = err.message
    }
        const existingUser = await userSchema.findById({_id: decoded.id})
        data = existingUser;
    })

/*     const findCandidate = await CandidateDetailSchema.findOne({user_id: data._id}); */

    const workExp = await CandidateDetailSchema.updateOne({
        user_id: data._id
    }, {   $set: 
                {   education_data:{
            experience_data: {
            designation: body.designation,
            company: body.company,
            state: {name: body.state},
            start_date: body.start_date,
            end_date: body.end_date,
            job_description: body.job_description
                            } 
                                    }
                }
    })
    return workExp; //incomplete
};

/* obj ={
    designation :"body.seshji",
    company:"company"
}

db.employeeset.update( { emp_id: 1231 },{ $set: {"education_data": obj}); */



module.exports = { addWorkExp, candidateLoginV2, candidateRegisterV2, candidateRegisterService, candidateLoginService, getCandidateListService, linkedInLoginService, linkedInCandidateDataService, linkedInCandidateEmail }