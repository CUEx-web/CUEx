import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
import React from "react";
import "../ActiveAccount.css";
import { Link } from "react-router-dom";



function ActiveAccount(){
    function ReturnLoginPage(){
    <Link to="/"></Link>
    window.location.href = 'http://localhost:3000/'
    }

    return(
        <div className="ActiveAccountBox">
            <div className='ActiveAccountLayout'>        
            <Navbar />
            <p className="Instruction">Your Account is now Active. Please Press the Button Below to Return to Login Page to Log In.</p>
            <button onClick={ReturnLoginPage} className="ActiveReturn">Return to Login Page</button>
            <Footer />
            </div>
        </div>

    );
}

export default ActiveAccount;