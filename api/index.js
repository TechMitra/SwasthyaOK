const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes/auth");



mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => console.log(" DB connection successfull")).catch((err) => console.log(err));


app.use(express.json());

app.use("/api/auth", authRoute);



app.listen(8800, () => {
    console.log("Application running");
});




module.exports = app;