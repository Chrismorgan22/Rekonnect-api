const mentorModel = require("../model/mentor_model");

const registerMentor = async (req, res) => {
  const newMentor = new mentorModel(req.body);

  try {
    const savedMentor = await newMentor.save();

    return res
      .status(200)
      .json({ message: "Mentor registered succesfully", data: savedMentor });
  } catch (error) {
    return res
      .status(500)
      .json({ message: ` Error caused due to ${error.message}` });
  }
};

module.exports = { registerMentor };
