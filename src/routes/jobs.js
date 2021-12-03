const jobDetails = require("../model/Job.js");
const router = require("Express").Router();

router.post("/createOne", async (req, res) => {
  try {
    const postJob = new jobDetails(req.body);
    const postedJob = await postJob.save();
    return res.status(200).json(postedJob);
  } catch (error) {
    return res.status(500).json("error while posting a job", error);
  }
});
router.get("/getAll", async (req, res) => {
  try {
    const fetchedJob = await jobDetails.findAll();
    return res.status(200).json(fetchedJob);
  } catch (error) {
    return res.status(500).json("Error while fetching jobs");
  }
});

router.post("/deleteOne", async (req, res) => {
  try {
    await jobDetails.findByIdAndDelete(req.body._id);
    return res.status(200).json("job deleted");
  } catch (error) {
    return res.status(500).json("error while deleting job");
  }
});

module.exports = router;
