const express = require("express")
const product = require("../models/product")
const router = express.Router()
const Product = require("../models/product")

const { authJwt } = require("../middlewares")

const productController = require("../controllers/product")

//Get product by productId
router.get('/:productId', productController.getProductById);

//Get all products or products by productName, category
router.get('/', productController.getProducts);

// Create product
router.post('/', authJwt.verifyToken, productController.postProduct);

// Update product
router.put('/:productId', authJwt.verifyToken, productController.updateProduct);

// Delete product
router.delete('/:productId', authJwt.verifyToken, productController.deleteProduct);

module.exports = router