const Products = require("../models/product")

exports.getAllProducts = async (req, res) => {
    try {
        Products.find()
        .populate("userId", "_id userName")
        .then(products => {
            console.log(products);
            return res.status(200).json(products);
        })
        .catch(err => {
            console.log(err);
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};
