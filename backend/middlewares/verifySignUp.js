const User = require("../models/user")

// Checks if the userName or email already exists during signup 
checkDuplicateUsernameOrEmail = (req, res, next) => {
    // check userName for any duplicates in database
    User.findOne({
        userName: req.body.userName
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }
        if (user) {
            res.status(400).send({ message: "Sorry! Username has already been taken." })
            return
        }
        // check email for any duplicates in database
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