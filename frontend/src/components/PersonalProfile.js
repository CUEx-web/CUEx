/*
Header Comment Block
What: Program to allow user to view their personal profile and perform different actions.
Who: Programmer:　Chan Tsun Hin
Where: The user clicked the "Profile" button in the Homepage.
When: Version : 13-04-2022
Why: Purpose: The user needs to have a page to review their personal information and their selling products. User can further edit their profile and products in this page.  		   
Data Structure: A product have Data Structure Below:
{
  userNameForProfilePage : String,
	studentId: Integer,
	grade: Integer,
	email: String,
	profileImg: String
} 

Key Algorithm: Display user perosnal information at the left hand side of the page and products that the user are selling are placed at the center of the page.
               Allow the user to click the products in the personal profile page, which will redirect the user to the Product Information Page.
               Allow the user to also click the "Edit Profile" button to be redircted to the Edit Profile Page. 
               Allow the user to click the "Edit Product" button to be redirected to the Edit Product Page.





*/



import Data from "./Data.js";
import Note from "./Note.js";
import PersonalProduct from "./PersonalProduct.js"
import "../PersonalProfile.css";
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import {Link} from "react-router-dom";

import { useState, useEffect } from "react";
import ProductBoxesToEditForProfile from './ProductBoxesToEditForProfile';
import { SetMealOutlined } from "@mui/icons-material";

import { useLocation } from 'react-router-dom';


function PersonalProfile(props){

  function PersonalEditProfile(){
    <Link to="/EditProfile"></Link>
    window.location.href = 'http://localhost:3000/EditProfile'
  } 

    const[renderPage,setRenderPage] = useState();
    

    const location = useLocation();
    const { userIDID } = location.state;
    console.log("This is userID" + userIDID)

    const[listingBoxes, setLisitngBoxes] = useState([]);
    const[userNameForProfilePage, setUserName] = useState([]);
    const[email, setEmail] = useState([]);
    const[grade, setGrade] = useState([]);
    const[studentId, setstudentId] = useState([]);
    const[profileImg, setprofileImg] = useState([]);

    let url = "http://localhost:3001/products";
    let method = "GET";
  //Second Example, GET products with productName = "Test"
    const queryParams = "?userId=";
    const queryValue = userIDID;
    console.log("This is userID")
    console.log(userIDID)
    url = url + queryParams + queryValue;
    console.log(url);
    useEffect(()=>{
      fetch(url, { method: method })
      .then((res) => {
        if (res.status !== 200) {
          //If there is any error, statusCode will not be 200 and will throw error
          throw new Error("Failed to fetch products.");
        }
        //Return response data to the next then block
        return res.json();
      })
      .then((resData) => {
        //Log the return data in the terminal, Frontend team can update things here
  
        console.log(resData);
        setLisitngBoxes(resData.productId)
        setUserName(resData.userName)
        setEmail(resData.email)
        setGrade(resData.grade)
        setstudentId(resData.studentId)
        setprofileImg(resData.profilePicture)
      })

  
    },[])



        
  /*To check is the current user a admin or the product owner */
  const [CurrentUserId,setCurrentUserId]=useState("")
  const [CurrentUserType,setCurrentUserType]=useState("")
  let url_user = "http://localhost:3001/api/loggedinuser";
  let method_user = "GET";
  console.log(url_user);
  fetch(url_user, { method: method_user, credentials: 'include' })
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
  // alert(JSON.stringify(resData));
      const useridvalue = resData._id.substr(0, resData._id.length);
      const usertype=resData.userType;
      setCurrentUserId(useridvalue);
      setCurrentUserType(usertype)
  })
  //check if the user is the admin user or the logged in user.
  useEffect(function isAdmin() {
    if (CurrentUserType==="Admin" || CurrentUserId===userIDID) {
      document.getElementById("PersonalProductEdit").style.visibility = "visible";
      document.getElementById("PersonalProfileEdit").style.visibility = "visible";
    }
  });

  return (
    <div>
    <Navbar />
    
    <div className="buttonBar">
      <button  id="PersonalProductEdit">
      <Link className="PersonalProductEdit" 
            to={{pathname:"/userProducts", 
            state:{
              userIDID: userIDID,
              profilePic: profileImg
      }}}>Edit Product</Link>
      </button>

      <button  id="PersonalProfileEdit">
      <Link className="PersonalProfileEdit" 
            to={{pathname:"/EditProfile", 
            state:{
              userIDID: userIDID
      }}}>Edit Profile</Link>
      </button>
            
      {/* <button onClick={PersonalEditProfile} className="PersonalProfileEdit" id="PersonalProfileEdit">Edit Profile</button> */}
    </div>

    {Data.map(returnElement => (
      <Note 
      key={returnElement.id}
      img= {"http://localhost:3001/" + profileImg}
      username={userNameForProfilePage}
      studentID={studentId}
      grade={"Year " + grade}
      email={email}

      />
       ) )}
       {/* <PersonalProduct /> */}
       <div className="PersonalProfileProductsBox">
         {listingBoxes.map(function(item, i){
            return <ProductBoxesToEditForProfile boxes={item} key={i} userName={userNameForProfilePage} profilePic={profileImg}/>;
          })}
        </div>
       
       <Footer/> 
       </div>
  );
}

export default PersonalProfile;
//<PersonalProduct />