const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const userRoute = require("./routes/users");
const adminRoute = require("./routes/admins");
const deptRoute = require("./routes/departmentRoutes");
const doctorRoute = require("./routes/doctorRoutes");
const hospitalRoutes = require ("./routes/hospitalRoutes");
const schemeRoutes = require("./routes/schemeRoutes");
const treatmentRoutes = require("./routes/treatmentRoutes");



mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => console.log(" DB connection successfull")).catch((err) => console.log(err));


app.use(express.json());


app.use("/api/users", userRoute);
app.use("/api/admin",adminRoute);
app.use("/api/dept",deptRoute);
 app.use("/api/doctor",doctorRoute);
app.use("/api/hospital", hospitalRoutes);
app.use ("/api/schemes",schemeRoutes);
app.use("/api/treatment",treatmentRoutes);



app.listen(8800, () => {
    console.log("Application running");
});




module.exports = app;