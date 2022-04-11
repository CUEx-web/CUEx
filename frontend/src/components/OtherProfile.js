import Data from "./Data.js";
import Note from "./Note.js";
import OtherProduct from "./OtherProduct.js";
import "../OtherProfile.css";
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import React, {useState} from "react";



function OtherProfile(){

  let AdminUser = false;


  
  
  function DeleteUsers(){
    const answer=window.confirm("Are you sure to delete?");
     console.log(answer)
     if(answer){

    let url = "http://localhost:3001/users";
      let method = "DELETE";
     
      console.log(url);
     
        fetch(url, { method: method })
        .then((res) => {
          if (res.status !== 200) {
            //If there is any error, statusCode will not be 200 and will throw error
            throw new Error("Failed to fetch products.");
          }

          console.log(res)
          //Return response data to the next then block
          return res.json();
        })
      }
  }


  

  return (
    <div>
    <Navbar />
    {AdminUser === true &&
    <button id="Delete" onClick={DeleteUsers} className="DeleteUsers">Delete Users</button>
    }
    
    {AdminUser === false &&
    <button id="Delete" className="CannotDeleteUsers">Delete Users</button>
    }
  
    {Data.map(returnElement => (
      <Note 
      key={returnElement.id}
      img={returnElement.img}
      username={returnElement.username}
      studentID={returnElement.studentID}
      grade={returnElement.grade}
      email={returnElement.email}
      />
       ) )}
       <OtherProduct />
       <Footer />
       </div>
  );

  
}

export default OtherProfile;