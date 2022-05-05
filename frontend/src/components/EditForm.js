import React,{useState, useEffect} from "react";
import "../EditProfile.css";

function ResetForm(props) {

  const userIDID = props.userIDID;
  console.log("This is userIDID from hello profile page")
  console.log(userIDID)

  const [inputCurrentUsername, setNewCurrentUsername] = useState("");
  const [inputNewEmail, setInputNewEmail] = useState("");
  const [inputNewPassword, setNewPassword] = useState("");
  const [inputNewGrade, setNewGrade] = useState("");
  const [profilePicture, setprofilePicture] = useState([]);
  const [gotUserName, updatedGotUserName] = useState("");
  //const uploadedImage = React.useRef(null);
    const ImageHandler = (e) => {
        const [file] = e.target.files;
        if (file) {
          const reader = new FileReader();
          setprofilePicture(file);
          //const { current } = uploadedImage;
          //current.file = file;
          /* reader.onload = (e) => {
            current.src = e.target.result;
          };*/
          reader.readAsDataURL(file);
        }
      };

     

  // Handle the value change for the email.
  function handleNewEmail(event){
    const newEmailValue = event.target.value;
    setInputNewEmail(newEmailValue);
  }
  // Handle the value change for the password.
  function handleNewPassword(event){
    const newPasswordValue = event.target.value;
    setNewPassword(newPasswordValue);
  }
  // Handle the value change for the grade.
  function handleNewGrade(event){
    const newGradeValue = event.target.value;
    setNewGrade(newGradeValue);

    
  }
  // Handle the value change for the username.
  function handleCurrentUsername(event){
    const newCurrentUsername = event.target.value;
    setNewCurrentUsername(newCurrentUsername);


  }
   // Handle the case that the user clicked the "Confirm Changes" button.
   function HandleSubmit(){  
    //alert(JSON.stringify(cookies));

    let url = "http://localhost:3001/api/loggedinuser";
    let method = "GET";

    console.log(url);

    fetch(url, { method: method, credentials: 'include' })
    .then((res) => {
      if (res.status !== 200) {
        //If there is any error, statusCode will not be 200 and will throw error
        throw new Error("Failed to fetch users.");
      }
      //Return response data to the next then block
      return res.json();
    })
    //.catch((error) => alert("", error))

    .catch((error) => alert("Error:", error))
    .then((resData) => {
      console.log(JSON.stringify(resData));
      //Log the return data in the terminal, Frontend team can update things here
      
      console.log(resData.userType !== "Admin");

      if (JSON.stringify(inputCurrentUsername) !== JSON.stringify(resData.userName) && resData.userType !== "Admin"){
        alert("Error: Incorrect Username !!");
      }
      else{
       // alert(JSON.stringify(resData));
        const useridvalue = resData._id.substr(0, resData._id.length);
    
        
        const formdata= new FormData();
        if(inputNewPassword === ""){
          const passwordvalue = resData.password.substr(0, resData.password.length);
          console.log(passwordvalue);
          formdata.append("password",passwordvalue);

        }else{
        formdata.append("password",inputNewPassword);}

        if(inputNewEmail === ""){
          const emailvalue = resData.email.substr(0, resData.email.length);
          console.log(emailvalue);
          formdata.append("email",emailvalue);

        }else{
        formdata.append("email",inputNewEmail);}

        if(inputNewGrade === ""){
          const gradevalue = resData.grade.substr(0, resData.email.grade);
          console.log(gradevalue);
          formdata.append("grade",gradevalue);

        }else{
          formdata.append("grade",inputNewGrade);

        }
        formdata.append("profileDescription"," ");
        formdata.append("event", "users");

        if(profilePicture.length === 0){
          //alert(JSON.stringify(resData));
          const imagevalue = resData.profilePicture.substr(0, resData.profilePicture.length);
        
          console.log(imagevalue);
          formdata.append("profilePicture", imagevalue);
        }else{
          formdata.append("profilePicture", profilePicture);

        }
      
        
        let edit_url = "http://localhost:3001/users/"+ userIDID;
        console.log(edit_url);
        fetch(edit_url, {
          method: "PUT", 
          credentials: 'include',// or 'PUT'
          //mode: 'no-cors', //seems no need this
          // headers: new Headers({
          //   "Content-Type": "multipart/form-data;"
          // }),
          body:(formdata) // data can be `string` or {object}!
        })
          .then((res) => res.json())
          .catch((error) => alert("Error !!", error))
          .then((response) => alert("Success !!", response))
      }
     
      
    })

   } 
  
   // Handle the case that the user clicked the "Reset" button.
  function handleClick(){
    setInputNewEmail("")
    setNewPassword("")
    setNewGrade("")
    setNewCurrentUsername("")
  }

  return (
    <form className="editform">
     <input required className="editinput" type="text" onChange={handleCurrentUsername} placeholder="Current Username" value={inputCurrentUsername} />
      <p className="paragraph">Please Enter Your Current Username .</p>
      <input className="editinput" type="text" onChange={handleNewEmail} placeholder="New Email" value={inputNewEmail} />
      <p className="paragraph">Please Enter Your New Email (Optional)</p>
      <input className="editinput" type="number" onChange={handleNewGrade} placeholder="New Grade" value={inputNewGrade} />
      <p className="paragraph">Please Enter Your New Grade (Optional)</p>
    
      <input className="editinput" type="password" onChange={handleNewPassword} placeholder="New Password" value={inputNewPassword}/>
      <p className="paragraph">Please Enter Your New Password (Optional)</p>
      <label className="editUpload">
          <input
            type="file"
            accept="image/*"
            onChange={ImageHandler}
            multiple={false}
            className="edituploadimagebutton"
          />
         <p>Please Upload Your New Profile Picture (Optional)</p> </label>
      <button className="editReset" onClick={handleClick}>Reset</button>
      <button type="button" className="editSubmit" onClick={HandleSubmit}>Confirm Changes</button>
      
   
    </form>
  );
}

export default ResetForm;
