const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const crypto = require("crypto");
//@desc: register user
//@route: POST /api/v1/signup
//@access: public
const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res
                .status(405)
                .json({ msg: "An account with this email already exists." });
        }
        //encrypt password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        req.body.password = passwordHash;
        //Create new user
        const newUser = new User(req.body);
        const user = await newUser.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
//@desc: login user
//@route: POST /api/v1/login
//@access: public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(400).json({ msg: "Please fill in all fields." });
        }
        //find user in database
        const user = await User.findOne({ email: email });
        if (!user) {
            return res
                .status(400)
                .json({ msg: "No account with this email has been registered." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Incorrect Password" });
        }
        //JSON webtoken
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({
            token,
            user: {
                id: user._id,
            },
        });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
//@desc: Edit user profile
//@route: POST /api/v1/edit
//@access: private
//@desc: get user 
//@route: GET /api/v1/user
//@access: private
const getUser = async (req, res) => {
    const user = await User.findById(req.user);
    if (!user) {
        return res.status(500).json({ error: err.message });
    }
    res.json(user);
};
//@desc: All users
//@route: GET /api/v1/users
//@access: public
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) {
            return res.status(500).json({ error: err.message });
        }
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
//@desc: Edit user profile
//@route: POST /api/v1/edit
//@access: private
const editUserDetails = async (req, res) => {
    try {
        let { name, email, password, newEmail } = req.body;
        const id = req.user;
        const existingUser = await User.findOne({ email: newEmail });
        if (existingUser) {
            return res
                .status(400)
                .json({ msg: "An account with this email already exists." });
        }
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);
            req.body.password = passwordHash;
        }
        if (newEmail) {
            req.body.email = newEmail;
        }
        await User.findByIdAndUpdate(id, req.body);
        const updatedUser = await User.findById(id);
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
module.exports = {
    registerUser,
    loginUser,
    getUser,
    getAllUsers,
    editUserDetails
};
