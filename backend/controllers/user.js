const Users = require("../models/user")
const mongoose = require('mongoose');
var bcrypt = require("bcryptjs")

//For delete image in server
const fs = require('fs');
const path = require('path');

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
                return res.status(500).json({ message: err.message })
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
                return res.status(500).json({ message: err.message })
            })
    }
    if (req.query.studentId) {
        // Return user with their studentId matching req.query.studentId
        Users.find({ "studentId": req.query.studentId })
            .populate("productId", "_id productName")
            .then(user => {
                console.log(user)
                return res.status(200).json(user)
            })
            .catch(err => {
                console.log(err)
                return res.status(500).json({ message: err.message })
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

exports.getUserById = async (req, res) => {
    console.log(req.params)
    const userId = req.params.userId;
    Users.findById(userId)
    .populate("userId", "_id userName")
    .then(users => {
        console.log(users);
        //Return 200 and users if success get
        return res.status(200).json(users);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: err.message });
    });
}

//Small program to delete image in server
const deleteImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => {
        if (err) {
            console.log(err)
        }
    })
};

exports.updateUser = async (req, res) => {
    //Get userId from parms
    const userId = req.params.userId;
    Users.findById(userId).then(user => {
        //Frontend will give all info; changeable attributes distinguished by "req.body.*"
        const userName = user.userName;
        const email = req.body.email;
        const userType = user.userType;
        const studentId = user.studentId;
        const status = user.status;
        const confirmationCode = user.confirmationCode;
        const registrationDate = user.registrationDate;
        let password = bcrypt.hashSync(req.body.password, 8);
        const productId = user.productId;
        const grade = req.body.grade;
        const profileDescription = req.body.profileDescription;
        let profilePicture = "";
        console.log(req.body);
        //If update userImage, but fail to parse
        if (Object.entries(req.files).length === 0) {
        console.log("Enter No Change Image Path")
        }
        //Replace \ with /
        if (!(Object.entries(req.files).length === 0) && (req.files.profilePicture.length > 0)) {
            //Repalce with updated photo
            profilePicture = req.files.profilePicture[0].path.replace(/\\/g,"/");
            console.log("Enter Change Image Path")
        }
        Users.findById(userId)
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        //If the user does not exist, return 404
                        message:  "Fail to update user",
                        error: "The user does not exist!"
                    })
                }
                // if (user._id.toString() != req.userId) {
                //     //If userId is not equal, then return 403
                //     return res.status(403).json({
                //         message: "You are not the user! Please login first."
                //     })
                // }
                if (profilePicture != "") {
                    //If new one not equal old one, delete the old image
                    deleteImage(user.profilePicture);
                } else {
                    profilePicture = user.profilePicture
                }
                //Update all info
                user.userName = userName;
                user.email = email;
                user.userType = userType;
                user.studentId = studentId;
                user.status = status;
                user.confirmationCode = confirmationCode;
                user.registrationDate = registrationDate;
                user.password = password;
                user.productId = productId;
                user.grade = grade;
                user.profileDescription = profileDescription;
                user.profilePicture = profilePicture;
                console.log(user)
                return user.save();
            })
            .then(updatedUser => {
                return res.status(200).json({
                    message: "User Updated!",
                    user: updatedUser
                });
            })
            .catch(err => {
                return res.status(500).json({
                    message: "Fail to delete user",
                    error: err
                })
            })
        })
}

exports.deleteUser = async (req, res) => {
    userId = req.params.userId;
    console.log(userId)
    Users.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "Fail to find the user"
                })
            }
            if (user._id.toString() != req.userId) {
                return res.status(403).json({
                    message: "You are not the user owner! Please login first"
                })
            }
            //Delete the user image in server
            deleteImage(user.profilePicture);
            //Delete user info in mongoDB
            console.log("OK")
            return Users.findByIdAndRemove(userId);
        })
        // .then(result => {
        //     return Users.findById(req.userId)
        // })
        // .then(user => {
        //     user.productId.pull(userId);
        //     return user.save();
        // })
        .then(result => {
            return res.status(200).json({
                message: "Deleted user with userId: " + userId
            });
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({
                message: "Fail to delete user",
                error: err
            })
        })
}

exports.forgetPassword = (req, res) => {
    Users.findOne({ "userName": req.body.userName })
        .then(user => {
            console.log(user)
            const userName = user.userName;
            console.log(userName)
            const email = user.email;
            const userType = user.userType;
            const studentId = user.studentId;
            const stat = user.status;
            const confirmationCode = user.confirmationCode;
            const registrationDate = user.registrationDate;
            let password = "";
            const productId = user.productId;
            const grade = user.grade;
            const profileDescription = user.profileDescription;
            const profilePicture = user.profilePicture;

        if (req.body.newPassword == req.body.confirmPassword) {
            password = bcrypt.hashSync(req.body.newPassword, 8)
            Users.findById(user._id)
                .then(users => {
                    console.log(userName)
                    users.userName = userName;
                    users.email = email;
                    Users.userType = userType;
                    users.studentId = studentId;
                    users.status = stat;
                    users.confirmationCode = confirmationCode;
                    users.registrationDate = registrationDate;
                    users.password = password;
                    users.productId = productId;
                    users.grade = grade;
                    users.profileDescription = profileDescription;
                    users.profilePicture = profilePicture;
                    console.log(users)
                    return users.save()
                })
                .then(updatedUser => {
                    return res.status(200).json({
                        message: "User Updated!",
                    })
                })
                .catch(err => {
                    console.log(err)
                    return res.status(500).json({
                        message: "Fail to delete user",
                        error: err
                    })
                })
            }
            else {
                return res.json({
                    message: "Passwords do not match! Please try again."
                })
            }
        })

}