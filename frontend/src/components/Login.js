/* 
Header Comment Block
What: Program for the login page.
Who: Chan Tsun Hin
Where: The user will first arrive to the login page when he visits our website, or the user clicked the button "Logout" in the homepage.
	     The user clicking the "Click Me" link in the verification email sent by CUEx will also redirect the user back to the login page.
Why: The user should visit a webpage which is used for user login, redirect user to either resetting their password or register for a new user.
Data Structure: Loginpage have Data Structure Below: 
{
  Username: String
  Password: String
}
Key Algorithm: When an user try to login, we first check if the username or password is correct or not. If they are incorrect, an error message will be popped up to the user's screen. Otherwise, the user will be redirected to the homepage.
               If the user clicked the "Forgot Password ?" button, the user will be redirected to the Forgot Password Page.
               If the user clicked the "Register Account !" button, the user will be redirected to the Register New User Page.


*/




import React from "react";
import Form from "../Form";
import "../Login.css";
import Footer from "./Footer.js";
import Logo from "../Images/WebsiteLogo.JPG";
import {Link} from "react-router-dom";


const LoginPage = () => {
  //To-do: Need to build layout
  var userIsRegistered = true;

  // Handle the case that the user clicked the "Forgot Password ?" button and redirect the user to the Forgot Password Page
  function handlePassword(){
    
    <Link to="/ForgotPassword"></Link>
    window.location.href = 'http://localhost:3000/ForgotPassword'
    
}

// Handle the case that the user clicked the "Register Account !" button and redirect the user to the Register New Account Page
function handleRegister(){
    
  <Link to="/RegisterNewUser"></Link>
  window.location.href = 'http://localhost:3000/RegisterNewUser'
  
}


  
  const date = new Date();
  const currentTime = date.getHours();

  let greeting;

  const customStyle = {
    color: ""
  };

  if (currentTime < 12) {
    greeting = "Good Morning!";
    customStyle.color = "black";
  } else if (currentTime < 18) {
    greeting = "Good Afternoon!";
    customStyle.color = "black";
  } else {
    greeting = "Good Night!";
    customStyle.color = "black";
  }


  return (

    <div className="LoginBigBox">
      <div className="logincontainer">
        <div className="WebsiteHeader">
        <img src={Logo} alt="Logo"></img>
        <p >CUEx</p>
        </div>     
        <p className="Introduction">~ CUHK Member's Self Trading Platform ! ~</p>
      <h1 className="loginheading" style={customStyle}>
        {greeting}
      </h1>
        <Form  isRegistered={userIsRegistered} />
        <button type="button" onClick={handlePassword} className="loginforgotpassword"> Forgot Password ?</button>
        <button type="button" onClick={handleRegister} className="register">Register Account !</button>
        
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;
