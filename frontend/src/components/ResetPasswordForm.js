
import React, { useState } from 'react';
 
function ResetForm() {
 // Initial the input value of username, password and confirmPassword to be empty.
  const [input, setInput] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
 // Initial the error message for the username, password and confirmPassword to be empty.
  const [error, setError] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })
  // Save the input value of the username, password and confirm Password when there is a change.
  const onInputChange = e => {
    const { name, value } = e.target;
    setInput(prev => ({
      ...prev,
      [name]: value
    }));
    validateInput(e);
  }
  // Handle the case that the user clicked the "Reset" button and set the value of password, confirmPassword and username to be empty.
  function handleResetReset(){
    input.password("");
    input.confirmPassword("");
    input.username("");
  }
  // Handle the case that the user clicked the "Submit" button and perform corrresponding action according to the user input.
  function handleResetSubmit(){

    let url = "http://localhost:3001/users";
    let method = "GET";
    const queryParams = "?userName=";
   const queryValue  = input.username;
    url = url + queryParams + queryValue;
    console.log(url);
 
    fetch(url, { method: method })
    .then((res) => {
      if (res.status !== 200) {
        //If there is any error, statusCode will not be 200 and will throw error
        throw new Error("Failed to fetch users.");
      }
      //Return response data to the next then block
      return res.json();
    })
    .catch((error) => alert("Error: Username Is Required !!", error))
    .then((resData) => {
      //Log the return data in the terminal, Frontend team can update things here
      if (resData.length === 0){
        alert("Error: Incorrect Username !!");
      }
      else if (input.password === "" || input.confirmPassword === ""){
        alert("⚠ Please Enter Password or Confirm Password !!");
      }
      else if (input.password !== input.confirmPassword){
        alert("⚠ Password and Confirm Password Does Not Match !!");
      }
      else if(resData.length > 0){
        const formdata= new FormData();
        formdata.append("userName", input.username);
        formdata.append("newPassword", input.password);
        formdata.append("confirmPassword", input.confirmPassword);

        
        let edit_url = "http://localhost:3001/users/api/forget";
        console.log(edit_url);
        fetch(edit_url, {
          method: "PUT", // or 'PUT'
          //mode: 'no-cors', //seems no need this
          // headers: new Headers({
          //   "Content-Type": "multipart/form-data;"
          // }),
          body:(formdata) // data can be `string` or {object}!
        })
          .then((res) => res.json())
          .catch((error) => alert("Error !!", error))
          .then((response) => alert("Success !!", response));

      }
      else{
        alert("Error !!");
      }
      
    })

  }
 // Check if the input of the username, password, confirmPassword is empty or not, and check if the value of the password and confirmPassword is the same or not and print the corresponding the error message.
  const validateInput = e => {
    let { name, value } = e.target;
    setError(prev => {
      const stateObj = { ...prev, [name]: "" };
 
      switch (name) {

        case "username":
          if (!value) {
            stateObj[name] = <div className='error-info'>Please enter username.</div>
          }
          break;
 
        case "password":
          if (!value) {
            stateObj[name] = <div className='error-info'>Please enter password.</div>
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] = <div className='error-info'>⚠ Password and confirm password does not match !!</div>
          } else {
            stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
          }
          break;
 
        case "confirmPassword":
          if (!value) {
            stateObj[name] = <div className='error-info'>Please enter confirm password.</div>
          } else if (input.password && value !== input.password) {
            stateObj[name] = <div className='error-info'>⚠ Password and confirm password does not match !!</div>
          }
          break;
 
        default:
          break;
      }
 
      return stateObj;
    });
  }
 
  return (
    <div className='forgot-password-layout'>
    <div className='reset-header'>Reset Password</div>
      <form className='reset-form'>

      <div className='reset-input-box'>
      <input
          type="text"
          name="username"
          placeholder=' '
          value={input.username}
          onChange={onInputChange}
          onBlur={validateInput}
          className="reset-input" 
          style={{
            border: error.username && '1px solid #C30000'
          }}></input>
          <label className="reset-input-label">username</label>
        </div>
        {error.username && <span className='err'>{error.username}</span>}
        

        <div className='reset-input-box'>
        <input
          type="password"
          name="password"
          placeholder=' '
          value={input.password}
          onChange={onInputChange}
          onBlur={validateInput}
          className="reset-input"
          style={{
            border: error.password && '1px solid #C30000'
          }}></input>
          <label className="reset-input-label">new password</label>
          </div>
        {error.password && <span className='err'>{error.password}</span>}

        <div className='reset-input-box'>
        <input
          type="password"
          name="confirmPassword"
          placeholder=' '
          value={input.confirmPassword}
          onChange={onInputChange}
          onBlur={validateInput}
          className="reset-input"
          style={{
            border: error.confirmPassword && '1px solid #C30000'
          }}></input>
          <label className="reset-input-label">confirm password</label>
          </div>
        {error.confirmPassword && <span className='err'>{error.confirmPassword}</span>}
        
        <div className='reset-button-box'>
          <button type="button" className="reset-button" onClick={handleResetReset}>Reset</button>
          <button type="button" className='forgot-button' onClick={handleResetSubmit}>Submit</button>
        </div>
      </form>
    </div>
  );
}
 
export default ResetForm;
