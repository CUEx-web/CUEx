const Products = require("../models/product")

exports.getProducts = async (req, res) => {
    console.log(req.query)
    if (req.query.productName) {
        //Return all products which their productName equals to the req.body.productName
        Products.find( { "productName": req.query.productName, "sellStatus": "available" } )
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
    if (req.query.category) {
        const category = JSON.parse(req.query.category);
        Products.find( { "category": { $in: category }, "sellStatus": "available"  } )
            .populate("userId", "_id userName")
            .then(products => {
                console.log(products);
                return res.status(200).json(products);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: err.message });
            });
    }
    if (Object.keys(req.query).length == 0) {
        //Empty query parameters means to return all products
        Products.find( { "sellStatus": "available" } )
            .populate("userId", "_id userName")
            .then(products => {
                console.log(products);
                return res.status(200).json(products);
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({ message: err.message });
            });
    } else if ((!req.query.category) && (!req.query.productName)) {
        //Return Error if wrong query is done
        return res.status(500).json({ message: "Call wrong api / Wrong query parameter" });
    }
};
