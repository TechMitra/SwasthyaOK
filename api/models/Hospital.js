const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema({

    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    isHospital: { type: Boolean, default: true }
},
    { timestamps: true }

);

module.exports = mongoose.model("Hospital", HospitalSchema);