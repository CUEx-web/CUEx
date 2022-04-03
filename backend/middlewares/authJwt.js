const jwt = require("jsonwebtoken")
const config = require("../config/authConfig.js")
const User = require("../models/user")

verifyToken = (req, res, next) => {
    let token = req.session.token
    if (!token) {
        return res.status(403).send({ message: "No token provided!" })
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized! "})
        }
        req.userId = decoded.id
        next()
    })
}
isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }
        if (user.userType == "Admin") {
            next()
            return
        }
        res.status(403).send({ message: "Admin privilege needed!" })
    })
}

const authJwt = {
    verifyToken,
    isAdmin
}
module.exports = authJwt