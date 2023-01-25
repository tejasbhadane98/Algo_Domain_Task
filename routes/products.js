const express = require("express");
const Product = require("../models/products");
const router = express.Router();

router.post("/product", async(req,res)=>{
    try{
        let products = await Product.create({...req.body});
        res.json(products);
    }
    catch(err){
        res.json(err.message)
    }
});

router.get("/product", async(req,res)=>{
    try{
        let products = await Product.find();
        res.json(products);
    }
    catch(err){
        res.json({err})
    }
})




module.exports = router;