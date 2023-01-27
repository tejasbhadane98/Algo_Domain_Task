const express = require("express");
const Product = require("../models/products");
const Discount = require("../models/discounts")
const router = express.Router();


// Adding Differnet Products to the Product Table
router.post("/product", async (req, res) => {
    try {
        let products = await Product.create({ ...req.body });
        res.json(products);
    }
    catch (err) {
        res.json(err.message)
    }
});




// Fetching all the Data From the Product table
router.get("/product", async (req, res) => {
    try {
        let products = await Product.find();
        res.json(products);
    }
    catch (err) {
        res.json({ err })
    }
})




// getProducts method will calculate the final price of each product based on discount and other charges table .
router.get("/getProducts/:Product_id", async (req, res) => {
    try {
        let products = await Product.findOne({ Product_id: req.params.Product_id });
        let discount = await Discount.findOne({ Product_category: products.Product_category })
        let totalDiscount =parseFloat( products.Product_price * (discount.Discount / 100)).toFixed(2);
        // console.log(parseFloat(totalDiscount));
        let charges = {
            gst: parseFloat((discount.GST / 100) * (products.Product_price - totalDiscount)),
            delivery: parseFloat(discount.Delivery_Charge_RS)
        }
        // console.log(charges);
        let final_Prize = products.Product_price - totalDiscount + (charges.gst + charges.delivery);
        // console.log(final_Prize);
        // console.log({...products, ...charges})
        // res.json({products,totalDiscount,...charges,final_Prize});
        let final_Output = {
            "productId": products.productId,
            "name": products.Product_name,
            "productType": products.Product_type,
            "category": products.Product_category,
            "basePrice": parseFloat(products.Product_price).toFixed(2),
            "discount": parseFloat(totalDiscount).toFixed(2),
            "charges": {
                "gst": parseFloat(charges.gst).toFixed(2),
                "delivery": parseFloat(charges.delivery).toFixed(2)
            },
            "finalPrice": parseFloat(final_Prize).toFixed(2)
        }

        res.json(final_Output)
    }
    catch (err) {
        res.json({ err })
    }
});



// Updating the product price depend upon the Product id
router.put("/product/:Product_id/:updatePrice", async(req,res)=>{
    try{
        let product = await Product.findOne({Product_id:req.params.Product_id});
        // console.log(product)
        let updateProduct = await Product.updateOne({Product_id:req.params.Product_id}, {$set:{Product_price:req.params.updatePrice}});
        // console.log(updateProduct);
        res.json("Product Prize Updated Succesfully and Prize is", updateProduct)
    }
    catch(err){
        console.log(err.message)
    }

});


//  Deleting the product from the database
router.delete("/product/:Product_id", async(req,res)=>{
    try{
        let product = await Product.deleteOne({Product_id:req.params.Product_id})
        // console.log(product)
        // console.log(updateProduct);
        res.json("Product Deletet From Database Succesfully")
    }
    catch(err){
        console.log(err.message)
    }

});



module.exports = router;