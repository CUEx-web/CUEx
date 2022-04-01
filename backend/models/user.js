//Model to interact with database
const mongoose = require("mongoose")

//The schema of user
const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        // required: true
    },
    userName: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true
    },
    userType: {
        type: String,
        // required: true
    },
    studentId: {
        type: String,
        required: false
    },
    password: {
        type: String,
        // required: true
    },
    rating: {
        type: Number,
        // required: true,
    },
    profilePicture: {
        type: String,
        // required: true,
    },
    productId: {
        type: [String],
        // required: true,
    },
    wishList: {
        type: [String],
        // required: true,
    },
    loginStatus: {
        type: Boolean,
        // required: true,
        default: false
    },
    profileDescription: {
        type: String,
        // required: true,
    },
    registrationDate: {
        type: Date,
        // required: true,
        default: Date.now
    }
})

module.exports = mongoose.model("User", userSchema)