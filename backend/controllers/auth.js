/*
MODULE: Auth Main
AUTHOR: Principe Jericho Bibat 1155144002@link.cuhk.edu.hk
VERSION 1: written 30-03-2022
PURPOSE: This is the authentication module. It can create or log in a user. It also activates the user.
IS COMPOSED OF: signup, verifyUser, signin, signout
DATA STRUCTURES: NONE
ALGORITHM: Any one of the following:
            1. signup: it can create a new user in mongoDB
            2. verifyUser: it can activate an account and change its status to active.
            3. signin: it can log in a user and return a session cookie
            4. signout: it can sign out a user and delete the session cookie
*/

const config = require("../config/authConfig")
const nodemailer = require("./mailer")
const User = require("../models/user")
var jwt = require("jsonwebtoken")
var bcrypt = require("bcryptjs")

exports.signup = (req, res) => {
    const password = bcrypt.hashSync(req.body.password, 8)
    const token = jwt.sign({ email: req.body.email }, config.secret)
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
        confirmationCode: token,
        studentId: req.body.studentId,
        grade: req.body.grade,
        rating: 0,
        profilePicture: profilePicture,
        productId: [],
        profileDescription: " ",
    })
    user.save((err) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }
        res.status(201).send({ message: "User was registered successfully! Please check your email." })

        nodemailer.sendConfirmationEmail(
            user.userName,
            user.email,
            user.confirmationCode
        )
    })
}

exports.verifyUser = (req, res, next) => {
    User.findOne({
      confirmationCode: req.params.confirmationCode
    })
    .exec((err, user) => {
        if (err){
            return res.status(500).send({ message: err })
        }
        if (!user){
        return res.status(404).send({ message: "User Not found." })
        }

        user.status = "Active";
        user.save((err) => {
            if (err){
                res.status(500).send({ message: err })
                return;
            }
            res.status(301).redirect("http://localhost:3000/loginPage")
        })
    })
};

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
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )
        if (!passwordIsValid) {
            return res.status(401).send({ message: "Invalid password."})
        }
        if (user.status != "Active") {
            return res.status(401).send({ message: "Pending Account. Please Verify Your Email!" })
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