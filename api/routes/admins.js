const router = require("express").Router();
const Query = require("../models/Query");
const Admin = require("../models/Admin");
const NewHospital = require("../models/NewHospital");
const CryptoJS= require("crypto-js");
const Hospital = require("../models/Hospital");


/*Successfull Routing. Work by @_Himank . checked by @_shriyash */



//register
router.post("/register", async (req, res) => {
    const newAdmin=new Admin({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()

    });
    try{

        const user= await newAdmin.save();
        res.status(201).json(user);
    }catch(err){
        res.status(500).json(err); 
    }
});



 //login 
router.post("/login", async (req, res) => {
   
    try{

        const admin= await  Admin.findOne({email:req.body.email});
        !admin && res.status(401).json("wrong password");

        const bytes  = CryptoJS.AES.decrypt(admin.password, process.env.SECRET_KEY);
        var originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        originalPassword!==req.body.password && res.status(401).json("wrong password");

        const {password,...info}=admin._doc;

        res.status(200).json({...info});
    }catch(err){
        res.status(500).json(err); 
    }
});


//Get all queries 
router.get("/queries", async (req, res) => {
    const query = req.query.new;


    try {
        const queries = await Query.find().populate();
        res.status(200).json(queries);


    } catch (error) {
        res.status(500).json(error)
        res.status(401).json(" Error Syncing Queries");
    }

});


//Get specific query by id

router.get("/queries/:id", async (req, res) => {
    

    try {
        const queries = await Query.findById(req.params.id);
        res.status(200).json(queries);
    } catch (error) {
        res.status(500).json(error);
    }

});



// Resolve Queries by changing its status from 'Submitted_from_user' to  'rejected/resolving/resolved'

router.put("/queries/resolveQuery/:id", async (req, res) => {

    try {

        const updatedQuery = await Query.findByIdAndUpdate(
            req.params.id,
            {

                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedQuery);
    } catch (err) {
        res.status(500).json(err);
    }

});


// get all  NewHospitals 

router.get("/NewHospitals", async(req,res) => {

    try {
        const hospital = await NewHospital.find();
        res.status(200).json(hospital);


    } catch (error) {
        res.status(500).json(error);
    }

});


// get  NewHospitals by id 

router.get("/NewHospitals/:id", async(req,res) => {

    try {
        const hospital = await NewHospital.findById(req.params.id);
        res.status(200).json(hospital);


    } catch (error) {
        res.status(500).json(error);
    }

});

// admin accepted hospital registeration.
router.post("/HospitalRegister/:id", async(req,res) => {


    try {

        const newHospital = await NewHospital.findById(req.params.id);
        const hospitals =  new Hospital({
            hospitalName: newHospital.hospitalName,
            email: newHospital.email,
            password: newHospital.password,
            address: newHospital.address,
            contact : newHospital.contact,
            doctorsList : newHospital.doctorsList,
            departmentsList : newHospital.departmentsList,
            treatmentList : newHospital.treatmentList,
            policies : newHospital.policies,
        });
       
     
        res.status(201).json(await hospitals.save());
        await NewHospital.findByIdAndDelete(req.params.id);
        
        
    } catch (error) {
        res.status(500).json(error);
       
    }

});


// admin rejected hospital registeration.
router.delete("/HospitalRegister/:id", async(req,res) => {


    try {

        const newHospital = await NewHospital.findById(req.params.id);   
        
        await NewHospital.findByIdAndDelete(req.params.id);
        res.status(200).json(newHospital);
        
    } catch (error) {
        res.status(500).json(error);
       
    }

});

module.exports = router;