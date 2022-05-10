const mongoose = require('mongoose')
const { Schema } = mongoose;
const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
  },
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  profileImage: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
},
  { timestamps: true }
);
module.exports = mongoose.model('User', userSchema)
