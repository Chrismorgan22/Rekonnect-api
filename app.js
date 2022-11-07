/**
 */
const payment = require("./src/routes/payment");
const { helperExport } = require("./src/controllers/exportToExcel");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(cors());
require('dotenv').config();
const adminRouter = require("./src/routes/admin.route.js");
const bodyParser = require("body-parser");
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(
  bodyParser.json({
    limit: "50mb",
  })
  );
  const bgvRoute = require("./src/routes/bgv_route.js");
  const mentorRouter = require("./src/routes/mentor_route");
  app.use(
    bodyParser.urlencoded({
      limit: "50mb",
      parameterLimit: 100000,
      extended: true,
    })
    );
    
    const VerifyToken = require("./src/middleware/verify_token");
    
const healthRouter = require("./src/routes/health_route");
const userRouter = require("./src/routes/user_route");
const candidateRouter = require("./src/routes/candidate_route");
const expertRouter = require("./src/routes/expert_route");
const jobRouter = require("./src/routes/job_route");
const lookupRouter = require("./src/routes/lookup_route");
const userProfileRouter = require("./src/routes/user_profile_route");
const employerRouter = require("./src/routes/employer_route");
const jobApplicationRouter = require("./src/routes/job_application_route");

require("./src/model/user_model");
require("./src/model/candidate_model");
require("./src/model/expert_model");
require("./src/model/job_model");
require("./src/model/user_role_model");
require("./src/model/temp_user_model");
require("./src/model/employer_model");
require("./src/model/job_application_model");

const lookupSchema = require("./src/model/lookup_model");
app.use("/", healthRouter);
app.use("/user", userRouter);
app.use("/candidate", candidateRouter);
app.use("/employer", employerRouter);
app.use("/expert", expertRouter);
app.use("/lookup", lookupRouter);
app.use("/job", jobRouter);
app.use("/mentor", mentorRouter);
app.use("/user/profile", userProfileRouter);
app.use("/job/application", jobApplicationRouter);
app.use("/api", payment);
app.use("/admin", adminRouter);
app.use("/report", bgvRoute);
app.use(cors());
helperExport("62674ef7170fe04dcc1c8d8d");
app.get("/excel", function (req, res) {
  var options = {
    root: path.join(__dirname),
  };
  
  var fileName = "data.xlsx";
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log("Sent:", fileName);
    }
  });
});
mongoose
  .connect(
      process.env.DATABASE_URL,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then(() => {
    console.log("connection to DB succesfull");
  })
  .catch(function (err) {
    console.log(err);
  });

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Our app is running on port number ${PORT}`);
});
