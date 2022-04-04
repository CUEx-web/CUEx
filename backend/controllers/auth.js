const config = require("../config/authConfig")
const User = require("../models/user")
var jwt = require("jsonwebtoken")
var bcrypt = require("bcryptjs")

exports.signup = (req, res) => {
    const password = bcrypt.hashSync(req.body.password, 8)
    //Store in server images dir
    console.log(req.files)
    if (req.files.profilePicture.length < 1) {
        return res.status(500).json({
            message: "Failed to create user.",
            error: "Error with image upload."
        })
    }
    const profilePicture = req.files.profilePicture[0].path.replace(/\\/g,"/")
    const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: password,
        userType: "Normal",
        studentId: req.body. studentId,
        rating: 0,
        profilePicture: profilePicture,
        productId: [],
        profileDescription: " ",
    })
    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }
        res.status(201).send({ message: "User was registered successfully!" })
    })
}
exports.signin = (req, res) => {
    User.findOne({
        userName: req.body.userName
    })
    // .populate("userType", "--v")
    .exec((err, user) => {
        if (err){
            return res.status(500).send({ message: err })
        }
        if (!user) {
            return res.status(404).send({ message: "User not found."})
        }
        console.log(user)
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )
        if (!passwordIsValid) {
            return res.status(401).send({ message: "Invalid password."})
        }
        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400
        })
        // var authorities = []
        // TODO: implement privilege
        req.session.token = token
        res.status(200).send({
            id: user._id,
            userName: user.userName,
            email: user.email,
            userType: user.userType,
        })
    })
}

exports.signout = async (req, res) => {
    try {
        req.session = null
        return res.status(200).send({ message: "You've been signed out."})
    } catch (err) {
        this.next(err)
    }
}

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.")
}
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
}
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
}