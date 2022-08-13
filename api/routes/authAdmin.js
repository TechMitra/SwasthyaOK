const router=require("express").Router();
const Admin=require("../models/Admin");
const CryptoJS= require("crypto-js");


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


module.exports=router;