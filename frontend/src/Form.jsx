//import { Alert } from "@mui/material";
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

const Form = (props) => {
  const[Username, Inputusername] = useState("");
  const[Password, Inputpassword] = useState("");
  var ActiveUser = true;
  const[userType, changedUserType] = useState("");

  
	

  // Handle user input for the username and save the username value
  function handleUsername(event) {
    const newValue = event.target.value;
    Inputusername(newValue);
  }
  // Handle user input for the password and save the password value
  function handlePassword(event) {
    const newValue = event.target.value;
    Inputpassword(newValue);
  }

  // Handle user login and return popup message regarding different cases
  function LoginSubmit(){
    if(ActiveUser === false){
    alert("Welcome !!");
  }
    else {
      const formdata= new FormData();
      formdata.append("userName", Username);
      formdata.append("password", Password);
    
    
    
      let url = "http://localhost:3001/api/auth/signin";
       fetch(url, {
        method: "POST", 
        body:(formdata),
        credentials: 'include' // data can be `string` or {object}!
        })
        .then((res) => res.json())
          .catch((error) => console.error("Error:", error))
          .then((response) => {

          if(response.flag === false){
            alert( JSON.stringify( response).replace('"flag":false,"message"','Error') )
          }
          else{
            
            console.log(JSON.stringify( response));
            if(response.userType === "Normal"){
              <Link to="/"></Link>
              window.location.href = 'http://localhost:3000/homepage'
            }
            else if(response.userType === "Admin"){
              <Link to="/OtherProfile"></Link>
               window.location.href = 'http://localhost:3000/homepage'
            }
            else {
              alert("We Can't find your account, please check your username and password or contact us.")
            }
           
          }
          })

            }
  }
  
  return (
    <form className="loginform">

      <div className="Login_username_box">
        <input className="LoginInput" onChange={handleUsername} type="text" placeholder=" " value={Username} />
        <label className="Username_label">username</label>
      </div>
      <div className="Login_password_box">
        <input className="LoginInput" onChange={handlePassword} type="password" placeholder=" " value={Password} />
        <label className="Username_label">password</label>
      </div>
      
      <button type="button" className="LoginSubmit" onClick={LoginSubmit}>Login</button>
    </form>
  );
}

export default Form;
