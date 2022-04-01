const Products = require("../models/product")

exports.getProducts = async (req, res) => {
    console.log(req.body)
    if (req.body.productName) {
        //Return all products which their productName equals to the req.body.productName
        Products.find( { "productName": req.body.productName } )
            .populate("userId", "_id userName")
            .then(products => {
                // if (products.length == 0) {
                //     //Product with required productName not found, return 404
                //     return res.status(404).json({ message: "Products not found" });
                // }
                console.log(products);
                return res.status(200).json(products);
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({ message: err.message });
            });
    }
    if (req.body.category) {
        Products.find( { "category": { $in: req.body.category } } )
            .populate("userId", "_id userName")
            .then(products => {
                // if (products.length == 0) {
                //     //Product with required productName not found, return 404
                //     return res.status(404).json({ message: "Products not found" });
                // }
                console.log(products);
                return res.status(200).json(products);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: err.message });
            });
    }
    if (Object.keys(req.body).length == 0) {
        //Empty body means to return all products
        Products.find()
            .populate("userId", "_id userName")
            .then(products => {
                console.log(products);
                return res.status(200).json(products);
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({ message: err.message });
            });
    }
};
