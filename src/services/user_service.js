const func = require('../config/function');
const UserDetailSchema = require('../model/user_model');
const UserRoleSchema = require('../model/user_role_model');
const { ObjectId } = require('bson');
var jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
var fs = require('fs');
var handlebars = require('handlebars');
let http = require('https');
var qs = require('querystring');
const TempUserSchema = require('../model/temp_user_model');
const userRegisterService = async (body) => {
    console.log(body);
    // var transporter = nodemailer.createTransport({
    //     host: 'smtp.gmail.com',
    //     port: 587,
    //     secure: false,
    //     auth: {
    //         user: "reachus@rekonnect.in",
    //         pass: "Rekonnect@2021",
    //     },
    // });
    // fs.readFile('index.html', { encoding: 'utf-8' }, function (err, html) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         var template = handlebars.compile(html);
    //         var replacements = {
    //             firstName: body.first_name,
    //             lastName: body.last_name
    //         };
    //         var htmlToSend = template(replacements);
    //         console.log(body.email)
    //         var mailOptions = {
    //             from: "ReKonnect India <reachus@rekonnect.in>",
    //             to: body.email,
    //             subject: "Welcome to Rekonnect",
    //             html: htmlToSend
    //         };
    //         transporter.sendMail(mailOptions, function (err, info) {
    //             if (err) {
    //                 console.log(err)
    //             } else {
    //                 console.log(info);
    //             }
    //             // func.msCons.successJson['data'] = docs;
    //             // return resolve(func.msCons.successJson)
    //         })
    //     }
    // });
    return new Promise(async (resolve, reject) => {
        var s = '';
        var randomchar = function () {
            var n = Math.floor(Math.random() * 62);
            if (n < 10) return n; //1-10
            if (n < 36) return String.fromCharCode(n + 55); //A-Z
            return String.fromCharCode(n + 61); //a-z
        }
        while (s.length < 25) s += randomchar();
        body['user_token'] = s;
        let model = {};
        model = new UserDetailSchema(body);
        await model.validate(async function (err, data) {
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
                            user_id: docs['_id'],
                            role: body.role
                        }
                        const roleModelSchema = new UserRoleSchema(roleBody);
                        await roleModelSchema.save(function (err, docs) {

                        })
                        var transporter = nodemailer.createTransport({
                            host: 'smtp.gmail.com',
                            port: 587,
                            secure: false,
                            auth: {
                                user: "reachus@rekonnect.in",
                                pass: "Rekonnect@2021",
                            },
                        });
                        fs.readFile('index.html', { encoding: 'utf-8' }, function (err, html) {
                            if (err) {
                                console.log(err);
                            } else {
                                var template = handlebars.compile(html);
                                var replacements = {
                                    firstName: body.first_name,
                                    lastName: body.last_name
                                };
                                var htmlToSend = template(replacements);
                                console.log(body.email)
                                var mailOptions = {
                                    from: "ReKonnect India <reachus@rekonnect.in>",
                                    to: body.email,
                                    subject: "Welcome to Rekonnect",
                                    html: htmlToSend
                                };
                                transporter.sendMail(mailOptions, async function (err, info) {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        console.log(info);
                                    }
                                    console.log(docs)
                                    const tempJson = {
                                        user_id: docs['_id'],
                                        user_token: s
                                    }
                                    const tempUserSchema = new TempUserSchema(tempJson);
                                    await tempUserSchema.save()
                                    docs['user_token'] = s;
                                    func.msCons.successJson['data'] = docs;
                                    // func.msCons.successJson['data']['user_token'] = s;
                                    return resolve(func.msCons.successJson)
                                })
                            }
                        });
                    }
                });
            }
        });
    })
}

const userLoginService = async (body) => {
    console.log(body);

    return new Promise((resolve, reject) => {
        let andQuery = [];
        if (body.password !== undefined) {
            andQuery.push({
                email: body.email
            }, {
                password: body.password
            })
        } else {
            andQuery.push({
                email: body.email
            })
        }
        UserDetailSchema.aggregate(
            [
                {
                    $match: {
                        $and: andQuery
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
                    $project: {
                        first_name: 1,
                        last_name: 1,
                        email: 1,
                        phone: 1,
                        status: 1,
                        is_deleted: 1,
                        token: 1,
                        register_complete: 1,
                        user_token: 1,
                        "user_role_details.role": 1,
                    }
                }
            ], function (err, docs) {
                console.log(docs)
                if (!docs || docs.length === 0) {
                    func.msCons.notFoundJson['message'] = 'No user found';
                    return resolve(func.msCons.notFoundJson)
                } else if (err) {
                    func.msCons.errorJson['message'] = err;
                    return resolve(func.msCons.errorJson)
                } else {
                    var token = jwt.sign({ id: docs._id }, 'intralogicitsolutions', {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    if (docs[0].user_role_details.length !== 0) {
                        docs[0]['role'] = docs[0].user_role_details[0].role;
                    }
                    docs[0]['token'] = token;
                    delete (docs[0].user_role_details);
                    func.msCons.successJson['data'] = docs[0];
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
const getUserListService = async (req) => {
    console.log(req.params.user_role, typeof req.params.user_role)
    return new Promise(async (resolve, reject) => {
        let query = [{
            $match: {
                $and: [
                    { is_deleted: false },
                    { role: Number(req.params.user_role) }
                ]
            },
        },
        {
            $lookup:
            {
                from: "user_details",
                localField: "user_id",
                foreignField: "_id",
                as: "user_details"
            }
        },
        { $unwind: "$user_details" },
        {
            $project: {
                user_id: 1,
                role: 1,
                "user_details.first_name": 1,
                "user_details.last_name": 1,
                "user_details.email": 1,
                "user_details.phone": 1
            }
        }
        ]
        await UserRoleSchema.aggregate(query, function (err, docs) {
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

const tempUserRegisterService = async (body) => {
    return new Promise((resolve, reject) => {
        // const model = new TempUserSchema(body)
        TempUserSchema.findOne({
            $and: [
                { user_id: ObjectId(body.user_id) },
                { user_token: body.user_token },
            ],
        })
            .select("temp_data")
            .lean()
            .then(async (result) => {
                console.log(result)
                if (result) {
                    let tempDataObject = {};
                    if (result.temp_data !== undefined) {
                        tempDataObject = Object.assign(result.temp_data, body.temp_data)
                    } else {
                        tempDataObject = body.temp_data
                    }
                    console.log(tempDataObject)
                    const query = {
                        $and: [
                            { user_id: body.user_id },
                            { user_token: body.user_token },
                        ],
                    };
                    const update = {
                        user_id: body.user_id,
                        user_token: body.user_token,
                        temp_data: tempDataObject,
                    };
                    await TempUserSchema.findOneAndUpdate(
                        query,
                        update,
                        {
                            returnOriginal: false,
                        },
                        function (err, docs) {
                            if (err) {
                                if (err.code === 11000) {
                                    Object.keys(err.keyValue);
                                    func.msCons.errorJson["message"] =
                                        Object.keys(err.keyValue) + " already exists";
                                    return resolve(func.msCons.errorJson);
                                }
                            } else if (!docs || docs.length === 0) {
                                func.msCons.errorJson["message"] =
                                    "Error in updating data";
                                func.msCons.errorJson["error"] = err;
                                return resolve(func.msCons.errorJson);
                            } else {
                                func.msCons.successJson["data"] = docs;
                                return resolve(func.msCons.successJson);
                            }
                        }
                    );
                }
            });

    })
}
const getTempUserDataService = async (body) => {
    return new Promise(async (resolve, reject) => {
        let query = [{
            $match: {
                $and: [
                    { user_id: ObjectId(body.user_id) },
                    { user_token: body.user_token },
                ],
            },
        }
        ]
        await TempUserSchema.aggregate(query, function (err, docs) {
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
const updateUserRegisterService = async (body) => {
    return new Promise(async (resolve, reject) => {
        // const model = new TempUserSchema(body)
        const query = {
            "_id": ObjectId(body.user_id)
        }
        const update = {
            "register_complete": true
        }
        await UserDetailSchema.findOneAndUpdate(
            query,
            update,
            {
                returnOriginal: false,
            },
            function (err, docs) {
                if (err) {
                    if (err.code === 11000) {
                        Object.keys(err.keyValue);
                        func.msCons.errorJson["message"] =
                            Object.keys(err.keyValue) + " already exists";
                        return resolve(func.msCons.errorJson);
                    }
                } else if (!docs || docs.length === 0) {
                    func.msCons.errorJson["message"] =
                        "Error in updating data";
                    func.msCons.errorJson["error"] = err;
                    return resolve(func.msCons.errorJson);
                } else {
                    func.msCons.successJson["data"] = docs;
                    return resolve(func.msCons.successJson);
                }
            }
        );
    })
}
module.exports = { userRegisterService, userLoginService, linkedInLoginService, linkedInCandidateDataService, linkedInCandidateEmail, getUserListService, tempUserRegisterService, getTempUserDataService, updateUserRegisterService }