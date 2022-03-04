//Model to interact with database
const mongoose = require("mongoose")

//The schema of transaction
const transactionSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    sellerId: {
        type: String,
        required: true
    },
    buyerId: {
        type: String,
        required: true
    },
    transType: {
        type: String,
        required: true
    },
    transId: {
        type: String,
        required: true
    },
    transTime: {
        type: Date,
        required: true,
        default: Date.now
    },
    transRating: {
        type: Number,
        required: true
    },
    transPrice: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Transaction", transactionSchema)
