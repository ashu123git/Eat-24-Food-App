// This is another schema which is used to store which user has ordered what item and how much and this will be stored in the database.

const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    order_data: {
        type: Array,
        required: true
    }
})

module.exports = new mongoose.model("order", OrderSchema);