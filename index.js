const express = require("express");
const mongoose = require("mongoose");
const mongodb = require("mongodb");

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://root:10xacademy@cluster0.hpnp08y.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("Connected to the MongoDB Database");
});

const product =require("./routes/products");
app.use(product);

const discount = require("./routes/discounts");
app.use(discount);


app.listen(3000, ()=>{
    console.log("Server is listening at the port no 3000");
});