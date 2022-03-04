const mongoose = require("mongoose")

//The schema of chat
const chatSchema = new mongoose.Schema({
    messages: {
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
    chatPicture: {
        type: String,
        required: true
    },
    sellerName: {
        type: String,
        required: true
    },
    buyerName: {
        type: String,
        required: true
    },
    bargainPrice: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Chat", chatSchema)