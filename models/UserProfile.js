const mongoose = require('mongoose')
const { Schema } = mongoose;
const userSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
);
module.exports = mongoose.model('User', userSchema)
