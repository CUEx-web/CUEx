import React from "react";
import ResetForm from "./ResetPasswordForm.js";
import Footer from "./Footer.js";

import "../ForgotPassword.css";

function ForgotPassword(){
    return (
      <div className="ForgotPasswordBox">
        <div className="forgotpasswordcontainer">
         <h1 className="heading">
        </h1>
          <ResetForm  />
          

        </div>
        <Footer />
        </div>
      );

}

export default ForgotPassword;