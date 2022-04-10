const { authJwt } = require("../middlewares")
const authController = require("../controllers/auth")
const User = require("../models/user")

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        )
        next()
    })
    app.get("/api/test/all", authController.allAccess)
    // app.get("/api/test/user", [authJwt.verifyToken], authController.userBoard)
    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        authController.adminBoard
    )
    app.get("/api/loggedinuser", [authJwt.verifyToken], (req, res) => {
        console.log(req.userId)
        User.findById(req.userId)
        .populate("productId", "_id productName")
        .then(user => {
            console.log(user)
            return res.status(200).json(user)
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({ message: err.message })
        })
    })
 }