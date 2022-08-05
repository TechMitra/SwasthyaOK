const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    username: { type: String, required: true, unique: true },
    mobileNo: { type: String, unique: true },
    email: {type: String, unique: true},
    password: {type: String, unique: true},
    age: { type: String, required: true },
    address: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
},
    { timestamps: true }

);

module.exports = mongoose.model("User", UserSchema);