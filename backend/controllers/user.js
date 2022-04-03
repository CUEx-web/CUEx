const Users = require("../models/user")
const mongoose = require('mongoose');

exports.getUsers = async (req, res) => {
    console.log(req.query)
    if (req.query.userName) {
        Users.find({ "userName": req.query.userName })
        .populate("productId")
        .then(user => {
            console.log(user)
            return res.status(200).json(user)
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({ message: err.message });
        })
    }
}