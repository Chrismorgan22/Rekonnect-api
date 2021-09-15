/**
 * @author Leena Patoliya
 */
const mongoose = require("mongoose")
const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors())
const bodyParser = require('body-parser');
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true
}));

const VerifyToken = require('./src/middleware/verify_token');

const userRouter = require('./src/routes/user_route');
const candidateRouter = require('./src/routes/candidate_route');
const expertRouter = require('./src/routes/expert_route');
const jobRouter = require('./src/routes/job_route');
const specializationRouter = require('./src/routes/specialization_route');
const graduationRouter = require('./src/routes/graduation_route');
const locationRouter = require('./src/routes/location_route');


require('./src/model/user_model');
require('./src/model/candidate_model');
require('./src/model/expert_model');
require('./src/model/job_model');

const specializationSchema = require('./src/model/specialization_model');
const locationSchema = require('./src/model/location_model');
const graduationSchema = require('./src/model/graduation_model');

app.use('/user', userRouter);
app.use('/candidate', candidateRouter);
app.use('/expert', expertRouter);
app.use('/job', VerifyToken, jobRouter);
app.use('/specialization', specializationRouter);
app.use('/graduation', graduationRouter);
app.use('/location', locationRouter);

mongoose.connect("mongodb+srv://rekonnect:UxyfPRexWLEHVq9F@cluster0.z8ojn.mongodb.net/dbRekonnect?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        // const specializationBody = {
        //     name: "Devops"
        // }
        // const locationBody = {
        //     name: "Rajkot"
        // }
        // const graduationBody = {
        //     name: "B.E"
        // }
        // const specializationData = new specializationSchema(specializationBody);
        // specializationData.save(function (err, data) {
        //     console.log('specialization data is inserted')
        // });
        // const locationData = new locationSchema(locationBody);
        // locationData.save(function (err, data) {
        //     console.log('location data is inserted')
        // });
        // const graduationData = new graduationSchema(graduationBody);
        // graduationData.save(function (err, data) {
        //     console.log('graduation data is inserted')
        // });
    })
const PORT = process.env.PORT || 8000;
app.listen(8000, () => {
    console.log(`Our app is running on port ${PORT}`);
});