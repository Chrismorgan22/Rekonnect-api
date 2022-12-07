const func = require('../config/function');
const { ObjectId } = require('bson');
var jwt = require('jsonwebtoken');
var fs = require('fs');
let http = require('https');
const bcrypt = require("bcrypt");
const { log } = require('console');

const userSchema = require('../model/user_model')
const mentorSchema = require('../model/mentor_model');
const bookingSchema = require('../model/booking_model _v2');

// const saltRounds = 10;
const salt = "$2b$12$ESEMmLu3Wn30WG.Na1RHzO";


const mentorRegisterV2 = async(body) => {

    // Save Mentor Role in User Model
    const existingUser = await userSchema.findOne({email:body.email})
    existingUser.role = 'mentor'
    const saveUser = await existingUser.save();    

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

  return {saveMentor, token, saveUser};

}

const mentorLoginV2 = async(body) => {

    const existingUser = await mentorSchema.findOne({email:body.email})

    const comparePassword= await bcrypt.compare(body.password, existingUser.password)
        if(comparePassword == false)
        {
            throw new Error(`Entered Password is Wrong!`);
        }
        else {
        var token = jwt.sign({ id: existingUser.user_id },'intralogicitsolutions', {
        expiresIn: 86400 // expires in 24 hours
        });
        return {existingUser,token};
        }
}; 

const createBooking = async(req) => {

    const token = req.body.localData[0];
    var data ;
    await jwt.verify(token, 'intralogicitsolutions', async function(err, decoded) {
        if (err){
            data = err.message
    }
        const existingUser = await userSchema.findById({_id: decoded.id})
        data = existingUser;
    })

    const newBooking = new bookingSchema();
    newBooking.candidate_id = data._id; //through token
    newBooking.mentor_id = req.body.mentor_id; //have to send through body
    newBooking.date = req.body.date; //body
   newBooking.time_slot = req.body.time_slot; 
/*    newBooking.topic = req.body.topic;
   newBooking.amount = req.body.amount;
   newBooking.video_meet_link = req.body.video_meet_link;
   newBooking.transaction_id = req.body.transaction_id; */
   const saveBooking = await newBooking.save();
    return saveBooking
}; 

module.exports = { createBooking, mentorRegisterV2, mentorLoginV2 }