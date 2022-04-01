const express = require("express")
const product = require("../models/product")
const router = express.Router()
const Product = require("../models/product")

const productController = require("../controllers/product")

//Get all products or products by productName, category
router.get('/', productController.getProducts);

// Create product
router.post('/', async(req, res) => {
    const product = new Product({
        //To do: generate userId
        productId: "1",
        productName: req.body.productName
    })
    try {
        const newProduct = await product.save()
        res.status(201).json(newProduct)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
});

// Update product
router.put('/:id', (req, res) => {
    
});

// Delete product
router.delete('/:id', async(req, res) => {
    //To do: delete product with specific productId
    try {
        await res.product.remove()
        res.json({
            message: "Delete product:" + product.ProductName
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});

module.exports = router