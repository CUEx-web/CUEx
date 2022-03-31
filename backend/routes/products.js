const express = require("express")
const product = require("../models/product")
const router = express.Router()
const Product = require("../models/product")

const productController = require("../controllers/product")

// Get all product
router.get('/', productController.getAllProducts);

router.get('/:productName', productController.getByProductName);

// Get one product
router.get('/:id', (req, res) => {
    //To do: return one specific product
    res.json(res.product)
});

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
router.patch('/:id', (req, res) => {
    
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

async function getProduct (req, res, next)  {
    let product
    try {
        product = await Product.findById(req.params.id)
        if (product == null) {
            return res.status(404).json({
                message: "Product not found"
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
    res.product = product
    next()
}

module.exports = router