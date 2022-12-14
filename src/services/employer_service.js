const func = require('../config/function');
const EmployerDetailSchema = require('../model/employer_model');
const userRoleSchema = require('../model/user_role_model');
const userSchema = require('../model/user_model');
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

// const saltRounds = 10;
const salt = "$2b$12$ESEMmLu3Wn30WG.Na1RHzO";

const employerRegisterService = async (body) => {
    console.log(body);

    return new Promise(async (resolve, reject) => {
        let model = {};
        model = new EmployerDetailSchema(body);
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
                            user_id: body.user_id,
                            role: 2
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

const employerRegisterServiceV2 = async (body) => {

    // Save Employer Role in User Model
    const existingUser = await userSchema.findOne({email:body.email})
    existingUser.role = 'employer'
    const saveUser = await existingUser.save();     
    
    // Save Employer
    const newEmployer = new EmployerDetailSchema();
    newEmployer.user_id = saveUser._id;

    newEmployer.address_details.landmark = body.address_details.landmark;
    newEmployer.address_details.state = body.address_details.state;
    newEmployer.address_details.zip_code = body.address_details.zip_code;
    
    newEmployer.company_address = body.company_address;
    newEmployer.company_name = body.company_name;
    newEmployer.industry = body.industry;
    newEmployer.company_description = body.company_description;
    newEmployer.designation = body.designation;
    newEmployer.no_of_employees = body.no_of_employees;
    newEmployer.experties = body.experties;
    newEmployer.languages = body.languages;
    
    newEmployer.linkedin_url = body.linkedin_url;
    newEmployer.instagram_url = body.instagram_url;
    newEmployer.facebook_url = body.facebook_url;

    const saveEmployer = await newEmployer.save(); 

    var token = jwt.sign({ id: saveEmployer.user_id }, 'intralogicitsolutions', {
        expiresIn: 86400 // expires in 24 hours
    });
    
      return {saveEmployer, token, saveUser};
}

const employerLoginV2 = async(body) => {

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


module.exports = { employerLoginV2, employerRegisterService, employerRegisterServiceV2 }