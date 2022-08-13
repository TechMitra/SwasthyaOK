const mongoose = require("mongoose");

const QuerySchema = new mongoose.Schema({

    userID: { type: String, required: true },
    hospitalID: { type: Number, required: true },
    queryText: { type: String, required: true},
    queryAttachment: { type: String, required: true },
    queryStatus: {type: String, default: "Submitted_From_User"}
},
    { timestamps: true }

);

module.exports = mongoose.model("Query", QuerySchema);