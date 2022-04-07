//Model to interact with database
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

//The schema of user
const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        default: "Normal",
        required: true
    },
    studentId: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Active"],
        default: "Pending"
    },
    confirmationCode: {
        type: String,
        unique: true
    },
    // grade: {
    //     type: String,
    //     required: true
    // },
    profilePicture: {
        type: String,
        required: true,
    },
    productId: [
        {
            type: [Schema.Types.ObjectId],
            ref: "Product"
        }
    ],
    profileDescription: {
        type: String,
        required: true,
    },
    registrationDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model("User", userSchema)