/*
MODULE: mailer Main
AUTHOR: Principe Jericho Bibat 1155144002@link.cuhk.edu.hk
VERSION 1: written 30-03-2022
PURPOSE: This is the mailer module. It is used to email the verification email to the user when signing up.
IS COMPOSED OF: sendConfirmationEmail
DATA STRUCTURES: NONE
ALGORITHM: Any one of the following:
            1. sendConfirmationEmail: it can send a randomly generated confirmation code to user's email
*/

const nodemailer = require("nodemailer")
const config = require("../config/authConfig")

const user = config.user
const pass = config.pass

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass
  }
})

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
    transport.sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for your registration. Please confirm your email by clicking on the following link</p>
          <a href=http://localhost:3001/api/auth/confirm/${confirmationCode}> Click here</a>
          </div>`,
    }).catch(err => {
        console.log(err)
    })
  }