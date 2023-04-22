// This route is used to display data that is present in data base for food items and food category.

const express = require("express");
const router = express.Router();

router.post("/foodData", (req, res)=>{
    try {
        res.send([global.food_items,global.food_categories]);
    } catch (error) {
        // console.error(error.message);
        res.send("Server Error");
    }
});

module.exports = router;