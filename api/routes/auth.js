const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js")

// Register

router.post("/register", async (req, res) => {

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt( req.body.password,process.env.SECRET_KEY).toString(),
        mobileNo: req.body.mobileNo,
        age: req.body.age,
        dob: req.body.dob,
        gender: req.body.gender,
        address:req.body.address
    })

    try {
        const user = await newUser.save();
        res.status(201).json(user);
    }catch(err){
        res.status(500).json(err);
    }
});




//LOGIN

router.post("/login",async (req,res)=>{

try {
    const user = await User.findOne({username: req.body.username});
    !user && res.status(400).json("Wrong password or username");

    const bytes = CryptoJS.AES.decrypt(user.password,process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);


        originalPassword !== req.body.password && 
        res.status(401).json(("Wrong password or username"));

        const {password, ...info} = user._doc;
        res.status(200).json(info);
        
        
}catch (error) {
    res.status(500).json(error);
}



});



module.exports = router;