const mongoose = require("mongoose")

//The schema of product
const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    productPicture: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sellStatus: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model("Product", productSchema)
