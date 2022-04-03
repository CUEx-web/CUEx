const { authJwt } = require("../middlewares");
const authController = require("../controllers/auth");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        )
        next()
    })
    app.get("/api/test/all", authController.allAccess)
    app.get("/api/test/user", [authJwt.verifyToken], authController.userBoard)
    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        authController.adminBoard
      )
 }