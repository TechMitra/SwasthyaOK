const express = require('express');
const Doctor = require('../models/Doctor');

const router = express.Router();

/*Successfull Routing. Work by @_Manish. checked by @_shriyash */

router.post("/adddoctor", async (req,res) => {
    const newDoctor = new Doctor({
        name:req.body.name,
        license: req.body.license,
        age: req.body.age,
        gender: req.body.gender,
        qualification: req.body.qualification,
        experience: req.body.experience,
        specialization : req.body.specialization,
        charges : req.body.charges,
    })

    try{
        const doctor = await newDoctor.save();
        res.status(201).json(doctor)
    }
    catch(err){
        res.status(500).json(err)
    }
})

router.put("/:id", async (req, res) => {

      try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedDoctor);
      } catch (err) {
        res.status(500).json(err);
      }
  });


router.get("/viewdoctor", async (req,res)=>{
    try{
        var criteria = { $or: [{doctorID: '62619082db191327ddd10430'}]}

        Doctor.find(criteria, function(err, foundDoctor){
            res.status(200).json(foundDoctor)
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
        
        await Doctor.findByIdAndDelete(req.params.id);
        res.status(200).json("deleted successfully");
      } catch (err) {
        res.status(500).json(err);
      }
})

module.exports = router