const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema({

    hospitalName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    contact : { type : Array, required: true },
    doctorsList : { type : Array, required: true },
    departmentsList : { type : Array, required: true },
    treatmentList : { type : Array, required: true },
    policies : { type : Array, required: true },
},
    { timestamps: true }

);

module.exports = mongoose.model("Hospital", HospitalSchema);