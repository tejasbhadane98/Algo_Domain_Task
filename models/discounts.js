const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const DiscountSchema = new Schema({
    Product_category : String,
    Discount: Number,
    GST:Number,
    Delivery_Charge_RS:Number

});

const DiscountModel = mongoose.model("discounts", DiscountSchema);
module.exports = DiscountModel;