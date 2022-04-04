const Users = require("../models/user")
const mongoose = require('mongoose');

exports.getUsers = async (req, res) => {
    console.log(req.query)
    if (req.query.userName) {
        // Return user with their userName matching req.query.userName
        Users.find({ "userName": req.query.userName })
            .populate("productId", "__id productName")
            .then(user => {
                console.log(user)
                return res.status(200).json(user)
            })
            .catch(err => {
                console.log(err)
                return res.status(500).json({ message: err.message });
            })
    }
    if (req.query.userId) {
        // Return user with their _id matching req.query.userId
        Users.find({ "_id": req.query.userId })
            .populate("productId", "__id productName")
            .then(user => {
                console.log(user)
                return res.status(200).json(user)
            })
            .catch(err => {
                console.log(err)
                return res.status(500).json({ message: err.message });
            })
    }
    if (Object.keys(req.query).length == 0) {
        // Empty query parameters means to return all users
        Users.find()
            .populate("productId", "__id productName")
            .then(users => {
                console.log(users)
                return res.status(200).json(users)
            })
            .catch(err => {
                console.log(err)
                return res.status(500).json({ message: err.message });
            })
    } else if ((!req.query.userName) && (!req.query.userId)) {
        // Return error if wrong query is done
        return res.status(500).json({ message: "Call wrong api / Wrong query parameter" });
    }
}