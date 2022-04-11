import React from "react";
import Form from "../Form";
import "../Login.css";
import Footer from "./Footer.js";
import Logo from "../Images/WebsiteLogo.JPG";
import {Link} from "react-router-dom";


const LoginPage = () => {
  //To-do: Need to build layout
  var userIsRegistered = true;

  function handlePassword(){
    
    <Link to="/ForgotPassword"></Link>
    window.location.href = 'http://localhost:3000/ForgotPassword'
    
}

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
