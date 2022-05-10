const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");
const { registerUser,
    loginUser,
    getUser,
    getAllUsers,
    editUserDetails } = require('../controllers/registerUser')
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/user", auth, getUser);
router.put("/edit", auth, editUserDetails);
router.get("/users", getAllUsers);
module.exports = router;
