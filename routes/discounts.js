const express = require("express");
const Discount = require("../models/discounts"); 
const router = express.Router();

// Adding Differnet Discounts to the Discount Table
router.post("/discount", async(req,res)=>{
    try{
        let discount = await Discount.create({...req.body})
        res.json(discount);
    }
    catch(err){
        console.log(err.message)
    }
});


// Fetching all the Data From the Discounts table
router.get("/discount", async(req,res)=>{
    try{
        let discount = await Discount.find();
        res.json(discount);
    }
    catch(err){
        console.log(err.message);
    }
});


// Updating the discount depend upon Product Category
router.put("/discount/:Product_category/:updateDiscount", async(req,res)=>{
    try{
       
        
        let discount = await Discount.findOne({Product_category:req.params.Product_category}); 
        // console.log(discount);
        let updateProductCategory= await Discount.updateOne({Product_category:req.params.Product_category}, {$set:{Discount:req.params.updateDiscount}})
        // console.log(updateProductCategory);
        res.json("Discount Updated Succesfully")
    }
    catch(err){
        console.log(err.message)
    }

});


// Updating the delievery Charges depend upon Product Category
router.put("/delivery/:Product_category/:updateDelieveryCharges", async(req,res)=>{
    try{
       
        
        let discount = await Discount.findOne({Product_category:req.params.Product_category}); 
        // console.log(discount);
        let updateProductCategory= await Discount.updateOne({Product_category:req.params.Product_category}, {$set:{Delivery_Charge_RS:req.params.updateDelieveryCharges}});
        res.json("Delievery Charges Updated Succesfully")
    }
    catch(err){
        console.log(err.message)
    }

});


// Deleting the data from the Discount table depend upon product category
router.delete("/Product_category", async(req,res)=>{
    try{
        let category = await Discount.deleteOne({Product_category:req.params.Product_category})
        res.json("Product Category Deleted Succesfully")
    }
    catch(err){
        console.log(err.message)
    }

});


module.exports = router;