const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../Schema/User");

const Login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  try {
    const loginUser = await User.findOne({ username });
    if (!loginUser) {
      res.status(709).json({
        message: "no user found",
      });
    }
    const passwordMatch = await bcrypt.compare(password, loginUser.password);
    if (!passwordMatch) {
      res.status(809).json({
        message: "wrong password",
      });
    }
    res.status(200).json({
      message: "Login successfull",
      _id: loginUser._id,
      name: loginUser.name,
      email: loginUser.email,
    });
  } catch (error) {
    res.status(401).json({
      message: "wrong password",
      error,
    });
  }
});
const createNewUser = asyncHandler(async (req, res) => {
  const { name, email, username, phone, password } = req.body;

  try {
    const userExist = await User.findOne({
      username,
      email,
    });
    if (userExist) {
      res.status(506).json({
        message: "user alreay exist",
      });
    }
    const create = await User.create({
      name,
      email,
      username,
      phone,
      password,
    });
    res.status(200).json({
      message: "post succesful",
      create,
    });
  } catch (error) {
    res.status(401).json({
      message: "unable to create",
      error,
    });
  }
});
const getAllUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const getAllUser = await User.find().sort({ createdAt: -1 });
  res.status(200).json(getAllUser);
});
const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const brown = await User.findById(id);
    res.status(200).json({
      message: "successful",
      brown,
    });
  } catch (error) {
    res.status(401).json({
      message: "error",
    });
  }
});
const getSingleUserByUsername = asyncHandler(async (req, res) => {
  const { username } = req.params;
  try {
    const brown = await User.findOne({ username });
    res.status(200).json({
      message: "successful",
      brown,
    });
  } catch (error) {
    res.status(401).json({
      message: "error",
    });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, username, email, phone, website, address, company } = req.body;
  try {
    const updateData = await User.findById(id);
    if (!updateData) {
      res.status(809).json({
        message: "content not found",
      });
    }
    updateData.name = name || updateData.name;
    updateData.username = username || updateData.username;
    updateData.email = email || updateData.email;
    updateData.phone = phone || updateData.phone;
    updateData.website = website || updateData.website;
    updateData.address = address || updateData.address;
    updateData.company = company || updateData.company;
    await updateData.save();
    res.status(200).json({
      message: "Update successfull",
      updateData,
    });
  } catch (error) {
    res.status(401).json({
      message: "Update not succesfull",
    });
  }
});
const updateUserPassword = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { password} = req.body;
  try {
    const updateData = await User.findById(id);
    if (!updateData) {
      res.status(809).json({
        message: "content not found",
      });
    }
    updateData.password = password || updateData.password;
    await updateData.save();
    res.status(200).json({
      message: "Update successfull",
      updateData,
    });
  } catch (error) {
    res.status(401).json({
      message: "Update not succesfull",
    });
  }
});
module.exports = {
  Login,
  createNewUser,
  getAllUser,
  getSingleUser,
  getSingleUserByUsername,
  updateUser,
  updateUserPassword,
};
