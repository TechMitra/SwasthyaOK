const router = require("express").Router();
const User = require("../models/User");
const Query = require("../models/Query");
const CryptoJS = require("crypto-js");


/* Successfull Routing. Work by @_shriyash */


// Register ** user register***

router.post("/register", async (req, res) => {

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
        mobileNo: req.body.mobileNo,
        age: req.body.age,
        dob: req.body.dob,
        gender: req.body.gender,
        address: req.body.address
    })

    try {
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});


//LOGIN  **user login**

router.post("/login", async (req, res) => {

    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(401).json("Wrong password or username");

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);


        originalPassword !== req.body.password &&
            res.status(401).json(("Wrong password or username"));


        const { password, ...info } = user._doc;

        res.status(200).json({ ...info });



    } catch (error) {
        res.status(500).json(error);
    }



});



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



//Submit/Raise  Query

router.post("/submitQuery/:id", async (req, res) => {

    const newQuery = new Query({
        userID: req.params.id,
        hospitalID: req.body.hospitalID,
        queryText: req.body.queryText,
        queryAttachment: req.body.queryAttachment,

    });

    try {
        await newQuery.save();
        res.status(201).json(newQuery);
    } catch (error) {
        res.status(500).json(error);
        res.status(501).json("Server Error while submitting query");
    }

});


// view Submitted queries according to you.

router.get("/viewSubmittedQuery/", async (req, res) => {

    let filter = {}

    if (req.query.categories) {
        filter = { userID: req.query.categories.split(',') };
    }

    try {
        const myQueries = await Query.find(filter).populate('userID');
        res.status(200).json(myQueries);
    } catch (err) {
        res.status(500).json(err);
    }


});

module.exports = router;