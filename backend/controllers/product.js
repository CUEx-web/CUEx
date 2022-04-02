const Products = require("../models/product");
const mongoose = require('mongoose');

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

exports.postProduct = async (req, res) => {
    const productName = req.body.productName;
    const price = req.body.price;
    //Store in server images dir
    if (req.files.productPicture.length < 1) {
        return res.status(500).json({
            message:  "Fail to create product",
            error: "The image is incorrect"
        })
    }
    //Replace \ with /
    const productPicture = req.files.productPicture[0].path.replace(/\\/g,"/");
    const category = req.body.category;
    const description = req.body.description;
    const sellStatus = "available";
    const like = 0;
    const condition = req.body.condition;
    const userId = req.body.userId;

    //Create the new product
    const product = new Products({
        productName: productName,
        price: price,
        productPicture: productPicture,
        category: category,
        description: description,
        sellStatus: sellStatus,
        like: like,
        condition: condition,
        userId: new mongoose.Types.ObjectId(userId)
    });
    product
        .save()
        .then(product => {
            return res.status(201).json({
                message: "Product successfully created!",
                product: product 
            });
        })
        .catch(err => {
            return res.status(500).json({
                message: "Fail to create product",
                error: err
            })
        });
};