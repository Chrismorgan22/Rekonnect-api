/**
 * @author Leena Patoliya
 */
const shortid = require("shortid");

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const adminRouter = require("./src/routes/admin.route.js");
const Razorpay = require("razorpay");
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
app.use("/user/profile", userProfileRouter);
app.use("/job/application", jobApplicationRouter);

app.use("/admin", adminRouter);

// mongodb+srv://rekonnect:UxyfPRexWLEHVq9F@cluster0.z8ojn.mongodb.net/dbRekonnect?retryWrites=true&w=majority
// mongodb+srv://rekonnect-prod:kmhvPpAPWGcqPFbc@rekonnect-prod-0.eds9d.mongodb.net/rekonnect?retryWrites=true&w=majority
mongoose
  .connect(
    "mongodb+srv://rekonnect-prod:kmhvPpAPWGcqPFbc@rekonnect-prod-0.eds9d.mongodb.net/rekonnect?retryWrites=true&w=majority",
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

const razorpay = new Razorpay({
  key_id: "rzp_test_nBBe0QbVWt2oIh",
  key_secret: "KhebpgbRB9k34YRV7nGSyXWL",
});
app.post("/verification", (req, res) => {
  // do a validation
  const secret = "12345678";

  console.log(req.body);

  const crypto = require("crypto");

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  console.log(digest, req.headers["x-razorpay-signature"]);

  if (digest === req.headers["x-razorpay-signature"]) {
    console.log("request is legit");
    // process it
    require("fs").writeFileSync(
      "payment1.json",
      JSON.stringify(req.body, null, 4)
    );
  } else {
    // pass it
  }
  res.json({ status: "ok" });
});

app.post("/razorpay", async (req, res) => {
  const payment_capture = 1;
  const amount = 499;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});
