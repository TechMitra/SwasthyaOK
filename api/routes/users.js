const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");



//GET

router.get("/find/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...info } = user._doc;
        res.status(200).json(info);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL

router.get("/find", async (req, res) => {
    const query = req.query.new;

    try {
        const users = query
            ? await User.find().sort({ _id: -1 }).limit(5)
            : await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
        res.status(403).json("You are not allowed to see all users!");
    }
});


//UPDATE

router.put("/update/:id", async (req, res) => {


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
}
);


//DELETE
router.delete("/delete/:id", async (req, res) => {

    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }

});


module.exports = router;