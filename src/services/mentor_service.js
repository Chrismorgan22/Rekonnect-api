const func = require('../config/function');
const { ObjectId } = require('bson');
var jwt = require('jsonwebtoken');
var fs = require('fs');
let http = require('https');
const bcrypt = require("bcrypt");
const { log } = require('console');

const mentorSchema = require('../model/mentor_model');

// const saltRounds = 10;
const salt = "$2b$12$ESEMmLu3Wn30WG.Na1RHzO";

const mentorRegisterV2 = async(body) => {
    // Save Mentor
    const newMentor = new mentorSchema();
    newMentor.user_id = body.user_id; 
    newMentor.expertise = body.expertise;
   newMentor.address_details.street = body.address_details.street;
   newMentor.address_details.landmark = body.address_details.landmark;
   newMentor.address_details.state = body.address_details.state;
   newMentor.address_details.zip_code = body.address_details.zip_code;
   const saveMentor = await newMentor.save();

   var token = jwt.sign({ id: saveMentor._id }, 'intralogicitsolutions', {
    expiresIn: 86400 // expires in 24 hours
});

  return {saveMentor, token};

}

const mentorLoginV2 = async(body) => {

    const existingUser = await mentorSchema.findOne({email:body.email})

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


module.exports = { mentorRegisterV2, mentorLoginV2 }