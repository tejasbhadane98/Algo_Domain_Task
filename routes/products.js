const express = require("express");
const Product = require("../models/products");
const Discount = require("../models/discounts")
const router = express.Router();

router.post("/product", async (req, res) => {
    try {
        let products = await Product.create({ ...req.body });
        res.json(products);
    }
    catch (err) {
        res.json(err.message)
    }
});

router.get("/product", async (req, res) => {
    try {
        let products = await Product.find();
        res.json(products);
    }
    catch (err) {
        res.json({ err })
    }
})

// router.get("/getProducts/:Product_id", async(req,res)=>{
//     try{
//         // console.log(req.params.Product_id);
//         let products = await Product.findOne({Product_id:req.params.Product_id});
//         res.json(products);
//     }
//     catch(err){
//         res.json(err.message)
//     }
// });

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
})




module.exports = router;