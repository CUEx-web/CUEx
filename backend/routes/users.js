const express = require("express")
const user = require("../models/user")
const router = express.Router()
const User = require("../models/user")

const { authJwt } = require("../middlewares")

const userController = require("../controllers/user")

//Get one user or all users
router.get("/", userController.getUsers)

// Update user
router.put('/:userId', authJwt.verifyToken, userController.updateUser)

//Delete user
router.delete("/:userId", authJwt.verifyToken, userController.deleteUser)

module.exports = router