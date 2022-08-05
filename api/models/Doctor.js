const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({

    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobileNo: { type: String, unique: true },
    age: { type: String, required: true },
    address: { type: String, required: true },
    license: { type: String, required: true, unique: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    isHospital: { type: Boolean, default: false }
},
    { timestamps: true }

);

module.exports = mongoose.model("User", DoctorSchema);