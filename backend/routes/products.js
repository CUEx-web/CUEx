const express = require("express")
const product = require("../models/product")
const router = express.Router()
const Product = require("../models/product")

const productController = require("../controllers/product")

//Get all products or products by productName, category
router.get('/', productController.getProducts);

// Create product
router.post('/', productController.postProduct);

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