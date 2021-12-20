const bgvModel = require("../model/bgv_model");

const addUser = async (req, res) => {
  const appliedUser = new bgvModel(req.body);

  try {
    const savedUser = await appliedUser.save();
    return res.status(200).json(savedUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const fetchUsers = async (req, res) => {
  try {
    const users = await bgvModel.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
};
module.exports = { addUser, fetchUsers };
