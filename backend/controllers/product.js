/*
MODULE: Products Main
AUTHOR: Chan King Yu 1155142699@link.cuhk.edu.hk
VERSION 1: written 30-03-2022
PURPOSE: This is the products module. It can update, create, delete, get a product.
IS COMPOSED OF: getProducts, getProductById, postProduct, updateProduct, deleteProduct
DATA STRUCTURES: NONE
ALGORITHM: Any one of the following:
            1. getProducts: get product(s) by productName / category / userId
            2. getProductById: it can get a product by productId
            3. postProduct: it can create a product in mongoDB
            4. updateProduct: it can update a product with productId
            5. deleteProduct: it can delete a product with productId
*/

const Products = require("../models/product");
const Users = require("../models/user")
const mongoose = require('mongoose');

//For delete image in server
const fs = require('fs');
const path = require('path');

exports.getProducts = async (req, res) => {
    console.log(req.query)
    if (req.query.productName) {
        //Return all products which their productName contains the req.body.productName
        Products.find( { "productName": {$regex: req.query.productName, $options: 'i'}, "sellStatus": "available" } )
            .populate("userId", "_id userName profilePicture")
            .then(products => {
                console.log(products);
                //Return 200 and products if success get
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
            .populate("userId", "_id userName profilePicture")
            .then(products => {
                console.log(products);
                //Return 200 and products if success get               
                return res.status(200).json(products);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: err.message });
            });
    }
    if (req.query.userId) {
        const userId = req.query.userId;
        //"_id productName price productPicture category description sellStatus like postDate condition "
        Users.findById(userId)
            .populate("productId", "_id productName price productPicture category description sellStatus like postDate condition paymentType")
            .then(products => {
                console.log(products);
                return res.status(200).json(products)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: err.message });
            });
    }
    if (Object.keys(req.query).length == 0) {
        //Empty query parameters means to return all products
        Products.find( { "sellStatus": "available" } )
            .populate("userId", "_id userName profilePicture")
            .then(products => {
                console.log(products);
                //Return 200 and products if success get
                return res.status(200).json(products);
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({ message: err.message });
            });
    } else if ((!req.query.category) && (!req.query.productName) && (!req.query.userId)) {
        //Return Error if wrong query is done
        return res.status(500).json({ message: "Call wrong api / Wrong query parameter" });
    }
};

exports.getProductById = async (req, res) => {
    console.log(req.params)
    const productId = req.params.productId;
    Products.findById(productId)
    .populate("userId", "_id userName profilePicture")
    .then(products => {
        console.log(products);
        //Return 200 and products if success get
        return res.status(200).json(products);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: err.message });
    });
}

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
    const paymentType = req.body.paymentType;
    const userId = req.userId;

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
        paymentType: paymentType,
        userId: new mongoose.Types.ObjectId(userId)
    });
    product
        .save()
        .then(product => {
            return Users.findById(req.userId)
        })
        .then(user => {
            user.productId.push(product)
            return user.save()
        })
        .then(e => {
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

//Small program to delete image in server
const deleteImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => {
        if (err) {
            console.log(err)
        }
    })
};

exports.updateProduct = async (req, res) => {
    //Get productId from parms
    const productId = req.params.productId;
    //Frontend will give all info
    const productName = req.body.productName;
    const price = req.body.price;
    const category = req.body.category;
    const description = req.body.description;
    const sellStatus = req.body.sellStatus;
    const like = req.body.like;
    const condition = req.body.condition;
    const paymentType = req.body.paymentType;
    let productPicture = "";
    //console.log(req.body);
    //console.log(req.body.productPicture)
    console.log(req.files.length)
    console.log(req.files)
    //console.log(req.files)
    //If update productImage, but fail to parse
    if (Object.entries(req.files).length === 0) {
        console.log("Enter No Change Image Path")
    }
    //Replace \ with /
    if (!(Object.entries(req.files).length === 0) && (req.files.productPicture.length > 0)) {
        //Repalce with updated photo
        productPicture = req.files.productPicture[0].path.replace(/\\/g,"/");
        console.log("Enter Change Image Path")
    }
    Products.findById(productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    //If the product does not exist, return 404
                    message:  "Fail to update product",
                    error: "The product does not exist!"
                })
            }
            // if (product.userId.toString() != req.userId) {
            //     //If userId is not equal, then return 403
            //     return res.status(403).json({
            //         message: "You are not the product owner! Please login first"
            //     })
            // }
            if (productPicture != "") {
                //If new one not equal old one, delete the old image
                deleteImage(product.productPicture);
            } else {
                productPicture = product.productPicture
            }
            //Update all info
            product.productName = productName;
            product.price = price;
            product.category = category;
            product.description = description;
            product.sellStatus = sellStatus;
            product.like = like;
            product.condition = condition;
            product.paymentType = paymentType;
            product.productPicture = productPicture;
            console.log("OK Delete")
            return product.save();
        })
        .then(updatedProduct => {
            return res.status(200).json({
                message: "Product Updated!",
                product: updatedProduct
            });
        })
        .catch(err => {
            return res.status(500).json({
                message: "Fail to delete product",
                error: err
            })
        })
}

exports.deleteProduct = async (req, res) => {
    productId = req.params.productId;
    console.log(productId);
    Products.findById(productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: "Fail to find the product"
                })
            }
            // if (product.userId.toString() != req.userId) {
            //     return res.status(403).json({
            //         message: "You are not the product owner! Please login first"
            //     })
            // }
            //Delete the product image in server
            deleteImage(product.productPicture);
            //Delete product info in mongoDB
            console.log("OK")
            return Products.findByIdAndRemove(productId);
        })
        .then(result => {
            return Users.findById(req.userId)
        })
        .then(user => {
            user.productId.pull(productId);
            return user.save();
        })
        .then(result => {
            return res.status(200).json({
                message: "Deleted product with productId: " + productId
            });
        })
        .catch(err => {
            return res.status(500).json({
                message: "Fail to delete product",
                error: err
            })
        })
}
