const express = require('express');
const Hospital = require('../models/Hospital');
const NewHospital = require('../models/NewHospital');

const router = express.Router();

router.post("/addhospital", async (req, res) => {
  const newHospital = new NewHospital({
    hospitalName: req.body.hospitalName,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
    contact: req.body.contact,
    doctorsList : req.body.doctorsList,
    departmentsList : req.body.departmentsList,
    treatmentList : req.body.treatmentList,
    policies : req.body.policies
  })

  try {
    const hospital = await newHospital.save();
    res.status(201).json(hospital)
  }
  catch (err) {
    res.status(500).json(err)
  }
})

router.put("/:id", async (req, res) => {

  try {
    const updatedHospital = await Hospital.findByIdAndUpdate(
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


router.get("/viewhospital", async (req, res) => {
  try {
    var criteria = { $or: [{ doctorID: '62619082db191327ddd10430' }] }

    Hospital.find(criteria, function (err, foundHospital) {
      res.status(200).json(foundHospital)
    });
  }
  catch (err) {
    res.status(500).json(err)
  }
})

router.get("/hospitalslist", async (req, res) => {
  try {
    const hospital = await Hospital.find();
    res.status(200).json(hospital);
  } catch (err) {
    res.status(500).json(err);
  }
})

//deletedoctor
router.delete("/:id", async (req, res) => {
  try {

    await Hospital.findByIdAndDelete(req.params.id);
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router