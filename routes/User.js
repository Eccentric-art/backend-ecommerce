const express = require("express");
const {
  createNewUser,
  Login,
  getAllUser,
  getSingleUser,
  getSingleUserByUsername,
  updateUser,
  updateUserPassword,
} = require("../Controller/User");

const router = express.Router();

// router.get("/", getAllContents);
router.post("/", createNewUser);
router.post("/login", Login);
router.get("/", getAllUser);
router.get("/:username/get", getSingleUserByUsername);
router.get("/:id", getSingleUser);
router.put("/:id", updateUser);
router.put("/:id/password", updateUserPassword);
// router.delete("/j/:id", deletePost);
module.exports = router;
