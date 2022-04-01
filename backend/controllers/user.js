const config = require("../config/authConfig")
const db = require("../models/user")
const User = db.User
var jwt = require("jsonwebtoken")
var bcrypt = require("bcryptjs")
const user = require("../models/user")

exports.signup = async function(req, res) {
    console.log("hello world")
    const password = bcrypt.hashSync(req.body.password, 8)
    const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: password 
    })
    console.log("hi")
    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }
        res.send({ message: "User was registered successfully!" })
        // TODO: save userType
    })
}
exports.signin = (req, res) => {
    User.findOne({
        username: req.body.userName
    })
    // .populate("userType", "--v")
    .exec((err, user) => {
        if (err){
            res.status(500).send({ message: err })
            return
        }
        if (!user) {
            res.status(404).send({ message: "User not found."})
            return
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )
        if (!passwordIsValid) {
            res.status(401).send({ message: "Invalid password."})
            return
        }
        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400
        })
        // var authorities = []
        // TODO: implement privilege
        req.session.token = token
        res.status(200).send({
            id: user._id,
            username: user.userName,
            email: user.email,
            // roles: authorities,
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
  };
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };