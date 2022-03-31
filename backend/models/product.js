const mongoose = require("mongoose")
const Schema = mongoose.Schema;

//The schema of product
const productSchema = new Schema({
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
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sellStatus: {
        type: String,
        required: true
    },
    like: {
        type: Number,
        required: true
    },
    postDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    condition: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Product", productSchema)
