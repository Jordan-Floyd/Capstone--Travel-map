const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");



// register

router.post("/register", async (req,res) => {
    try {
        // New pw
        const userlookup = await User.findOne({ username:req.body.username });
        if(userlookup)
        { 
            res.status(200).json("User already registered!");
            console.log("Here0");
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create new user
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
        });


        // save user and response
        const user = await newUser.save();
        res.status(200).json(user._id)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


// Login

router.post("/login", async (req,res)=>{
    try{
        // find user
        const user = await User.findOne({ username:req.body.username });
        if(!user)
        { 
            res.status(400).json("Wrong username or password!");
            console.log("Here1");
            return;
        }
        // validate pw
        const validPassword = await bcrypt.compare(
            req.body.password, 
            user.password
        );
        console.log("Here2");
        if(!validPassword) 
        {
            res.status(400).json("Wrong username or password!");
            return;
        }
        console.log("Here3");
        // send res
        res.status(200).json({ _id:user._id, username:user.username });

    } catch (err) {
        console.log("Here4");
        res.status(500).json(err);
    }
});

module.exports = router;
