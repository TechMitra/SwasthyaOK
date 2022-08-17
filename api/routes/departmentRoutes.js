const express = require('express');
const Department = require('../models/Department');
const Doctor = require('../models/Doctor');

const router = express.Router();

router.post("/adddoctor", async (req,res) => {
    const newDepartment = new Department({
        name: req.body.name,
        totalBeds: req.body.totalBeds,
        availableBeds: req.body.availableBeds
    })

    try{
        const user = await newDepartment.save();
        res.status(201).json(user)
    }
    catch(err){
        res.status(500).json(err)
    }
})

router.put("/:id", async (req, res) => {
  
      try {
        const updatedHospital = await Department.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedHospital);
      } catch (err) {
        res.status(500).json(err);
      }
  });


router.get("/viewdepartment", async (req,res)=>{
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

router.get("/departmentlist", async (req,res)=>{
    try {
        const departmentList = await Department.find();
        res.status(200).json(doctors);
      } catch (err) {
        res.status(500).json(err);
      }
})

//deletedoctor
router.delete("/:id", async (req,res)=>{
    try {
        
        await Department.findByIdAndDelete(req.params.id);
      } catch (err) {
        res.status(500).json(err);
      }
})

module.exports = router