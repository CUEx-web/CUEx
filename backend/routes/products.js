const express = require("express")
const product = require("../models/product")
const router = express.Router()
const Product = require("../models/product")

// Get all product
router.get('/', async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch(err) {
        res.status(500).json({ 
            message: err.message 
        })
    }
})

// Get one product
router.get('/:id', (req, res) => {
    
})

// Create product
router.post('/', (req, res) => {
    
})

// Update product
router.patch('/:id', (req, res) => {
    
})

// Delete product
router.delete('/:id', (req, res) => {
    
})

module.exports = router