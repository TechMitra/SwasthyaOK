const express = require('express');
const Treatment = require('../models/Treatment');

const router = express.Router();

router.post("/addtreatment", async (req,res) => {
    const newTreatment = new Treatment({
        name:req.body.name,
        fees: req.body.fees,
        specialization: req.body.specialization,
    })

    try{
        const treatment = await newTreatment.save();
        res.status(201).json(user)
    }
    catch(err){
        res.status(500).json(err)
    }
})

router.put("/:id", async (req, res) => {
  
      try {
        const updatedTreatment = await Treatment.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedTreatment);
      } catch (err) {
        res.status(500).json(err);
      }
  });


router.get("/viewtreatment", async (req,res)=>{
    try{
        var criteria = { $or: [{doctorID: '62619082db191327ddd10430'}]}

        Treatment.find(criteria, function(err, foundtreatment){
            res.status(200).json(foundtreatment)
        });
    }
    catch(err){
        res.status(500).json(err)
    }
})

router.get("/treatmentslist", async (req,res)=>{
    try {
        const treatments = await Treatment.find();
        res.status(200).json(treatments);
      } catch (err) {
        res.status(500).json(err);
      }
})

//deletedoctor
router.delete("/:id", async (req,res)=>{
    try {
        
        await Treatment.findByIdAndDelete(req.params.id);
      } catch (err) {
        res.status(500).json(err);
      }
})

module.exports = router