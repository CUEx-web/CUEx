import React, { useState , Component} from 'react';
import "../RegisterNewUser.css";
import Footer from "./Footer.js";
import { Link } from "react-router-dom";


export default function Form() {
	const [profilePicture, setprofilePicture] = useState([]);

	const uploadedImage = React.useRef(null);
  	const ImageHandler = (event) => {
    const [file] = event.target.files;
    if (file) {
      const reader = new FileReader();
	  console.log(uploadedImage);
      //const { current }  = uploadedImage;
	  setprofilePicture(file);
	  console.log(file);
      //current.file = file;
      /*reader.onload = (event) => {
        current.src = event.target.result;
      };*/
      reader.readAsDataURL(file);
    }
  };
	


// States for registration
const [username, setUsername] = useState('');
const [studentid, setstudentid] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [grade, setGrade] = useState('');

const formdata= new FormData();
formdata.append("userName", username);
formdata.append("event", "users");
formdata.append("studentId", studentid);
formdata.append("email", email);
formdata.append("password", password);
formdata.append("grade", grade);
formdata.append("profileDescription", "abc")
formdata.append("profilePicture", profilePicture);
// States for checking the errors
const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState(false);



  

// Handling the Username change
const handleUsername = (e) => {
    var NewUserName = e.target.value;
	setUsername(e.target.value);
	setSubmitted(false);
};

// Handling the Student ID change
const handlestudentid = (e) => {
    var NewUstudentid = e.target.value;
	setstudentid(e.target.value);
	setSubmitted(false);
};

// Handling the Email change
const handleEmail = (e) => {
    var NewEmail = e.target.value;
	setEmail(e.target.value);
	setSubmitted(false);
};

// Handling the Password change
const handlePassword = (e) => {
    var NewPassword = e.target.value;
	setPassword(e.target.value);
	setSubmitted(false);
};

// Handling the Grade change
const handleGrade = (e) => {
    var NewGrade = e.target.value;
	setGrade(e.target.value);
	setSubmitted(false);
};


// Handling the form submission
const handleSubmit = (e) => {
	e.preventDefault();
	if (username === '' || studentid === '' || email === '' || password === '' || grade === '') {
	setError(true);
	} else {
	setSubmitted(true);
	setError(false);
	
 


  let url = "http://localhost:3001/api/auth/signup";

	fetch(url, {
		method: "POST", 
		body:(formdata) // data can be `string` or {object}!
	  })
	  .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response));


	  
	}

	

};

const handleClick = () => {
    setUsername("")
	setstudentid("")
    setEmail("")
    setPassword("")
    setGrade("")
	setprofilePicture("")
}

// Showing success message
const successMessage = () => {
	return (
	<div
		className="success"
		style={{
		display: submitted ? '' : 'none',
		}}>
		<h1>User {username} Successfully Registered !! 
        Please Check Your Email Account for Further Verification !!</h1>
		
	</div>
	);
};

// Showing error message if error is true
const errorMessage = () => {
	return (
	<div
		className="error"
		style={{
		display: error ? '' : 'none',
		}}>
		<h1>Please Enter All Fields !!</h1>
	</div>
	);
};

return (
	<div className="RegisterNewUserBox">
		<div className="Regform">
		<div>
			<h1 className="header">User Registration</h1>
		</div>

		{/* Calling to the methods */}
		<div >
			{errorMessage()}
			{successMessage()}
		</div>

		<form className='RegisterForm'>
			
			<input placeholder='Username' required onChange={handleUsername} className="Registerinput"
			value={username} type="text" />

			<input placeholder="Student ID" required onChange={handlestudentid} className="Registerinput"
			value={studentid} type="number" />

			<input placeholder="Grade" required onChange={handleGrade} className="Registerinput"
			value={grade} type="number" />
			
			<input placeholder="Email"   required onChange={handleEmail} className="Registerinput"
			value={email} type="email" />

			<input placeholder="Password" required onChange={handlePassword} className="Registerinput"
			value={password} type="password" />


			<input
				type="file"
				accept="image/*"
				onChange={ImageHandler}
				multiple={false}
				className="uploadimagebutton"
			/>
			<p className="Description">Please Upload Your Profile Picture or Leave it Blank to Upload Later.</p> 

		<button className="RegisterReset" onClick={handleClick}>Reset</button>
		<button className="RegisterSubmit" onClick={handleSubmit} type="submit">Confirm Registeration</button>
		
		</form>
		<Footer />
		</div>
	</div>
);
}
