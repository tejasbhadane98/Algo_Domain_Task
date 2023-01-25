const express = require("express");
const Discount = require("../models/discounts"); 
const router = express.Router();

router.post("/discount", async(req,res)=>{
    try{
        let discount = await Discount.create({...req.body})
        res.json(discount);
    }
    catch(err){
        console.log(err.message)
    }
});

router.get("/discount", async(req,res)=>{
    try{
        let discount = await Discount.find();
        res.json(discount);
    }
    catch(err){
        console.log(err.message);
    }
});

module.exports = router;