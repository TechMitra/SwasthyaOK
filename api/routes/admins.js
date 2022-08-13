const router = require("express").Router();
const Query = require("../models/Query");
const Admin = require("../models/Admin");


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


module.exports = router;