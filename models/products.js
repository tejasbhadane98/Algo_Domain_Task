const { Double } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    Product_id: Number,
    Product_name: String,
    Product_type: String,
    Product_category: String,
    Product_price:Number
});

const ProductModel = mongoose.model("products", ProductSchema);
module.exports = ProductModel;