//Model to interact with database
const mongoose = require("mongoose")

//The schema of user
const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    // userType: {
    //     type: String,
    //     required: true
    // },
    // studentId: {
    //     type: String,
    //     required: false
    // },
    registionDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model("User", userSchema)