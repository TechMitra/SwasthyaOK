const express = require('express');

const router = express.Router();

router.post("/adddoctor", async (req,res) => {
    const newUser = new User({
        name:req.body.name,
        email:req.body.email,
        mobilenumber:req.body.mobilenumber,
        password: req.body.password,
        age: req.body.age,
        gender: req.body.gender,
    })

    try{
        const user = await newUser.save();
        res.status(201).json(user)
    }
    catch(err){
        res.status(500).json(err)
    }
})

router.put("/:id", async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.SECRET_KEY
        ).toString();
      }
  
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You can update only your account!");
    }
  });


router.get("/viewdoctor", async (req,res)=>{
    try{
        var criteria = { $or: [{doctorID: '62619082db191327ddd10430'}]}

        Availability.find(criteria, function(err, foundslots){
            res.status(200).json(foundslots)
        });
    }
    catch(err){
        res.status(500).json(err)
    }
})

router.get("/doctorslist", async (req,res)=>{
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
      } catch (err) {
        res.status(500).json(err);
      }
})

//deletedoctor
router.delete("/:id", async (req,res)=>{
    try {
        
        await Appointment.findByIdAndDelete(req.params.id);
      } catch (err) {
        res.status(500).json(err);
      }
})

module.exports = router