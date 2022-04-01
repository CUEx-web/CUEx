const User = require("../models/user")

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    User.findOne({
        userName: req.body.userName
    }).exec((err, user) => {
        if (err) {
            console.log("nice day")
            res.status(500).send({ message: err })
            return
        }
        if (user) {
            res.status(400).send({ message: "Sorry! Username has already been taken." })
            return
        }
        // Email
        User.findOne({
            email: req.body.email
        }).exec((err, email) => {
            if (err) {
                res.status(500).send({ message: err })
                return
            }
            if (email) {
                console.log(email)
                res.status(400).send({ message: "Sorry! Email is already in use." })
                return
            }
            next()
        })
    })
}

const verifySignUp = { checkDuplicateUsernameOrEmail }
module.exports = verifySignUp