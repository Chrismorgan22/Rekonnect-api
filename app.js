/**
 * @author Leena Patoliya
 */
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const jobsRouters = require("./src/routes/jobs");
const adminRouter = require("./src/routes/admin.route.js");
app.use(cors());
const bodyParser = require("body-parser");
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

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

require("./src/model/user_model");
require("./src/model/candidate_model");
require("./src/model/expert_model");
require("./src/model/job_model");
require("./src/model/user_role_model");
require("./src/model/temp_user_model");
require("./src/model/employer_model");

const lookupSchema = require("./src/model/lookup_model");

app.use("/", healthRouter);
app.use("/user", userRouter);
app.use("/candidate", candidateRouter);
app.use("/employer", employerRouter);
app.use("/expert", expertRouter);
app.use("/lookup", lookupRouter);
app.use("/job", VerifyToken, jobRouter);
app.use("/user/profile", userProfileRouter);

app.use("/JobCopy", jobsRouters);
app.use("/admin", adminRouter);

// mongodb+srv://rekonnect:UxyfPRexWLEHVq9F@cluster0.z8ojn.mongodb.net/dbRekonnect?retryWrites=true&w=majority
// mongodb+srv://rekonnect-prod:kmhvPpAPWGcqPFbc@rekonnect-prod-0.eds9d.mongodb.net/rekonnect?retryWrites=true&w=majority
mongoose
  .connect(
    " mongodb+srv://rekonnect-prod:kmhvPpAPWGcqPFbc@rekonnect-prod-0.eds9d.mongodb.net/rekonnect?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    // const lookupBody = {
    //     name: "Other",
    //     lookup_type: "City"
    // }
    // const looupData = new lookupSchema(lookupBody);
    // looupData.save(function (err, data) {
    //     console.log('lookup data is inserted')
    // });
    console.log("connection to DB succesfull");
  })
  .catch(function (err) {
    console.log(err);
  });
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});
