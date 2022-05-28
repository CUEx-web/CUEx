import React from "react";
import ResetForm from "./ResetPasswordForm.js";
import Footer from "./Footer.js";
import "../ForgotPassword.css";

// Calling the Reset Password Form and generate the layout for the Forgot Password Page.
function ForgotPassword(){
    return (
      <div>
        <div className="forgotPasswordContainer">
          <ResetForm />
        </div>
        <Footer />
      </div>
      );

}

export default ForgotPassword;