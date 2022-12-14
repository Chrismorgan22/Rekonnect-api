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

   var token = jwt.sign({ id: existingUser._id }, 'intralogicitsolutions', {
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

    const arr = [req.body.monday_slot, req.body.tuesday_slot, req.body.wednesday_slot, req.body.thursday_slot, req.body.friday_slot, req.body.saturday_slot,req.body.sunday_slot];
    const trueSlots = arr.filter(checkTrue);
    console.log(trueSlots)

    function checkTrue(age) {
    return age === true;
    }

    const newBooking = new bookingSchema();
    newBooking.candidate_id = data._id; //through token
    newBooking.mentor_id = req.body.mentor_id; //have to send through body
    newBooking.days = trueSlots; //body
   newBooking.time_slot = req.body.time_slot; 

/*    newBooking.topic = req.body.topic;
   newBooking.amount = req.body.amount;
   newBooking.video_meet_link = req.body.video_meet_link;
   newBooking.transaction_id = req.body.transaction_id; */
   const saveBooking = await newBooking.save();
    return saveBooking
}; 

const addMeetLink = async(req) => {

    const addedMeetLink = await bookingSchema.updateOne({
        _id: req.body.booking_id
    }, {   $set: {
        video_meet_link: req.body.meet_link
    }
    })

    return addedMeetLink
};

const setSlot = async(req) => {
    const token = req.body.localData[0];
    var data ;
    await jwt.verify(token, 'intralogicitsolutions', async function(err, decoded) {
        if (err){
            data = err.message
    }
        const existingUser = await userSchema.findById({_id: decoded.id})
        data = existingUser;
    })

    const obj1 = {
        slot : {
        start_time1: req.body.start_time1,
        end_time1: req.body.end_time1,
        start_time2: req.body.start_time2,
        end_time2: req.body.end_time2,
        start_time3: req.body.start_time3,
        end_time3: req.body.end_time3,
        start_time4: req.body.start_time4,
        end_time4: req.body.end_time4,
        start_time5: req.body.start_time5,
        end_time5: req.body.end_time5,
        },
        days: {
            monday: req.body.monday,
            tuesday: req.body.tuesday,
            wednesday: req.body.wednesday,
            thursday: req.body.thursday,
            friday: req.body.friday,
            saturday: req.body.saturday,
            sunday: req.body.sunday,
        },
    }

    const addedSlot = await mentorSchema.updateOne({
        user_id: data._id
    }, {   $set: {
        available_slots: obj1
        }
    })

    const findSlot = await mentorSchema.findById({user_id: data._id})

    return findSlot
};

const getBooking = async(req) => {

    const token = req.body[0];
    var data ;
    await jwt.verify(token, 'intralogicitsolutions', async function(err, decoded) {
        if (err){
            data = err.message
    }
        const existingUser = await userSchema.findById({_id: decoded.id})
        data = existingUser;
    })

    var resultobjarray = [];

    const existingMentor = await mentorSchema.findOne({user_id: data._id})

    const existingBooking = await bookingSchema.find({mentor_id: existingMentor._id})
    

    if(existingBooking !== null){
    for (var i = 0; i < existingBooking.length; i++) { 

    const sessionWith = await userSchema.find({_id: existingBooking[i].candidate_id});
    var resultObj = {
        firstName: '',
        lastName: '',
        date: '',
        time_slot: '',
        booking_id: '',
        video_meet_link: 'No Meet Link Available',
    }

    var first_name = sessionWith.first_name;
    var last_name = sessionWith.last_name;
    var date = existingBooking[i].date;
    var time_slot = existingBooking[i].time_slot;
    var booking_id = existingBooking[i]._id;
    var video_meet_link = existingBooking[i].video_meet_link;
    
    resultObj.firstName = first_name;
    resultObj.lastName = last_name;
    resultObj.time_slot = time_slot;
    resultObj.date = date;
    resultObj.booking_id = booking_id;
    resultObj.video_meet_link = video_meet_link;
    resultobjarray.push(resultObj);
        }
    return resultobjarray;
    } else {
        var resultObj = {
            firstName: '',
            lastName: '',
            date: '',
            time_slot: '',
            booking_id: '',
            video_meet_link: 'No Meet Link Available',
        }
        return resultObj;
    }
};

const getSlot = async(req) => {

};

module.exports = { getBooking, getSlot, setSlot, addMeetLink, createBooking, mentorRegisterV2, mentorLoginV2 }