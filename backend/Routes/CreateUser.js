// This is used to create a route for /createuser endpoint. Whenever a user goes to this route then a new user will be created and the same will be saved on database.

const express = require("express");
const router = express.Router();
const User = require("../models/User");  // Importing schema that the users will use.
const expressValidator = require("express-validator"); // Used to validate user signup and login.
const bcrypt = require("bcrypt"); // This is used so that we can secure the passowrd of our user.

router.post("/createuser", expressValidator.body('email', "Wrong email").isEmail(),
// password must be at least 5 chars long
expressValidator.body('password', "Wrong password").isLength({ min: 5 }), 
expressValidator.body('name', "Enter correct name").isLength({min:3})
,async(req, res)=>{ // Data is going from /createuser endpoint to wherever we want it to send.
    const errors = expressValidator.validationResult(req);  // For checking errors in validation.
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // if no errors, then run below code.
    const salt = await bcrypt.genSalt(10); // Add extra security. Here I have used await because bcrypt functions are asynchronous by default and async ke saath hamesa await use hota hai.
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    try {
        User.create({
            name: req.body.name,
            password: hashedPassword,
            email: req.body.email,
            location: req.body.location
        })
        res.send({success: true});   
    } catch (error) {
        // console.log("Some error");
        res.send({success: false});
    }
})

module.exports = router;