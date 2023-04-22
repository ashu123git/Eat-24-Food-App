const mongoose = require("mongoose");
// created schema and model for users so that whenever a new user is created, it uses the below structure.
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = new mongoose.model("user", UserSchema);