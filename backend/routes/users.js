const express = require("express")
const user = require("../models/user")
const router = express.Router()
const User = require("../models/user")

//Get all user
router.get("/", async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

//Get one user
router.get("/:id", getUser, (req, res) => {
    //To do: return one specific user
    res.json(res.user)
})
//Create user
router.post("/", async (req, res) => {
    const user = new User({
        //To do: generate userId
        userId: "1",
        userName: req.body.userName
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

//Update user
router.patch("/", (req, res) => {
    //To do: update user with json info input
})

//Delete user
router.delete("/:id", getUser, async(req, res) => {
    //To do: delete user with specific user id
    try {
        await res.user.remove()
        res.json({
            message: "Delete user:" + user.userName
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

async function getUser (req, res, next)  {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({
                message: "User not found"
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
    res.user = user
    next()
}

module.exports = router