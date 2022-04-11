import React from 'react'
import "../UserProductsBody.css"
import ListingBox from './ListingBox'
import { useState, useEffect } from "react";
import ProductBoxesToEdit from './ProductBoxesToEdit';
import Footer from './Footer';

import { useLocation } from 'react-router-dom';

const UserProductsBody = (props) => {

    const[listingBoxes, setLisitngBoxes] = useState([]);
    const[userNameForEditPage, setUserName] = useState([]);
    const[profilePic, setProfilePic] = useState([]);

    const location = useLocation();
    const { userIDID, profileImg } = location.state;

    let url = "http://localhost:3001/products";
    let method = "GET";
  //Second Example, GET products with productName = "Test"
    const queryParams = "?userId=";
    const queryValue = userIDID;
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
        setProfilePic(resData.profilePicture)
      })
  
  
    },[])
    

  return (
    <div>
        <div className='UserProductHeading'>{userNameForEditPage}'s Product</div>
        <div className="UserProductsEditContainer">
          {listingBoxes.map(function(item, i){
            return <ProductBoxesToEdit boxes={item} key={i} userName={userNameForEditPage} profilePic={profilePic} />;
          })}
        </div>
        <Footer />
    </div> 
  )
}

export default UserProductsBody