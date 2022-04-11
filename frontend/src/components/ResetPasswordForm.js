
import React, { useState } from 'react';
 
function ResetForm() {
 
  const [input, setInput] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
 
  const [error, setError] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })
 
  const onInputChange = e => {
    const { name, value } = e.target;
    setInput(prev => ({
      ...prev,
      [name]: value
    }));
    validateInput(e);
  }

  function handleResetReset(){
    input.password("");
    input.confirmPassword("");
    input.username("");
  }

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
          .catch((error) => console.error("Error:", error))
          .then((response) => console.log("Success:", response));

      }
      else{
        alert("Error !!");
      }
      
    })

  }
 
  const validateInput = e => {
    let { name, value } = e.target;
    setError(prev => {
      const stateObj = { ...prev, [name]: "" };
 
      switch (name) {

        case "username":
          if (!value) {
            stateObj[name] = <p className='paragraph'>Please Enter Username.</p>
          }
          break;
 
        case "password":
          if (!value) {
            stateObj[name] = <p className='paragraph'>Please Enter Password.</p>
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] = <p className='paragraph'>⚠ Password and Confirm Password Does Not Match !!</p>
          } else {
            stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
          }
          break;
 
        case "confirmPassword":
          if (!value) {
            stateObj[name] = <p className='paragraph'>Please Enter Confirm Password.</p>
          } else if (input.password && value !== input.password) {
            stateObj[name] = <p className='paragraph'>⚠ Password and Confirm Password Does Not Match !!</p>
          }
          break;
 
        default:
          break;
      }
 
      return stateObj;
    });
  }
 
  return (
    <div className='ForgotLayout'>
    <h1 className='resetheader'>Reset Password</h1>
      <form>
 
      <input
          type="text"
          name="username"
          placeholder='Enter Username'
          value={input.username}
          onChange={onInputChange}
          onBlur={validateInput}
          className="ResetInput"></input>
        {error.username && <span className='err'>{error.username}</span>}
 
        <input
          type="password"
          name="password"
          placeholder='Enter Password'
          value={input.password}
          onChange={onInputChange}
          onBlur={validateInput}
          className="ResetInput"></input>
        {error.password && <span className='err'>{error.password}</span>}
 
        <input
          type="password"
          name="confirmPassword"
          placeholder='Enter Confirm Password'
          value={input.confirmPassword}
          onChange={onInputChange}
          onBlur={validateInput}
          className="ResetInput"></input>
        {error.confirmPassword && <span className='err'>{error.confirmPassword}</span>}

        <button className="ResetReset" onClick={handleResetReset}>Reset</button>
        <button type="button" className='ForgotSubmit' onClick={handleResetSubmit}>Submit</button>
      </form>
    </div>
  );
}
 
export default ResetForm;
