// This route will create a record in the database once the user clicks on checkout button. That user's email and the food items will be stored in the database.

const express = require("express");
const router = express.Router();

const Order = require("../models/Orders");
router.post("/orderData", async (req, res)=>{
    let data = req.body.order_data;
    // console.log(data);
    await data.splice(0, 0, {Order_date: req.body.order_date});

    let eId = await Order.findOne({"email": req.body.email});
    // console.log(eId);
    if(eId === null) {  // This means that current order is the first order of the respective user.
        // console.log("Yes");
        try {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(()=>{
                res.send({success: true});
            })
        } catch (error) {
            res.send("Server Error");
        }
    }
    else {
        try {
            // This means user already has ordered some item previously and now he want to add extra items in his cart. So it will append the extra data.
            await Order.findOneAndUpdate({email: req.body.email},
            {$push: {order_data: data}}).then(()=>{
                res.join({success: true});
            })
        } catch (error) {
            res.send("Server Error");
        }
    }
})

router.post("/myOrderData", async (req, res)=>{
    try {
        let myData = await Order.findOne({"email": req.body.email});
        // console.log(myData);
        res.json({orderData: myData});
    } catch(error) {
        res.send("Server Error");
    }
})

module.exports = router;