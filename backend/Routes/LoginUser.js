// This is used to create a route for /createuser endpoint. Whenever a user goes to this route then a new user will be created and the same will be saved on database.

const express = require("express");
const router = express.Router();
const User = require("../models/User");  // Importing schema that the users will use.
const expressValidator = require("express-validator"); // Used to validate user signup and login.
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = "MyNameisAshutoshChoubey";

router.post("/loginUser", [expressValidator.body('email', "Wrong email").isEmail(),
// password must be at least 5 chars long
expressValidator.body('password', "Wrong password").isLength({ min: 5 })]
, async(req, res)=>{// Data is going from /createuser endpoint to wherever we want it to send.
    const errors = expressValidator.validationResult(req);  // For checking errors in validation.
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let userData = req.body.email;
    // console.log(userData);
    try {
        let userEmail = await User.findOne({email: userData});
        // console.log(userEmail);
        if(!userEmail) {
            return res.status(400).json({ errors: "Incorrect Credentials" });
        }
        const cmpPassword = await bcrypt.compare(req.body.password, userEmail.password);
        // console.log(cmpPassword);
        if(!cmpPassword) {
            return res.status(400).json({ errors: "Incorrect Credentials" });
        }

        // This below data is written so as to maintain user session so that whenever he logs in, the data will get saved in the cache memory. The next time he logs in, he will not be asked to enter userid and password again, until he logs out;
        const data = {
            user:{
                id: userEmail.id
            }
        }
        const authToken = jwt.sign(data, jwtSecret);
        // const authToken = "Hello";
        return res.json({success: true, authToken:authToken});
    } catch (error) {
        // console.log("Some error");
        return res.json({success: false});
    }
});

module.exports = router;