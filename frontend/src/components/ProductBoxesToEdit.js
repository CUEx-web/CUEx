/*
Header Comment Block
What: Edit the products as "Sold" or to delete the product
Who: Programmer:　THALANG Ikshahang
Where: Edit product page
When: Version : 13-04-2022
Why: Purpose: To contain products in boxes for modularity	
Data Structure: Products
{
productName: string
price: integer
productPicture: string
category: integer
description: string
sellStatus: string
like: integer
condition: string
paymentType: string
userId: integer
postDate: Date
}
*/

import React, { useEffect } from 'react'
import "../ProductBoxesToEdit.css";
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import { IconButton } from '@mui/material';
import { useState } from "react";

const ProductBoxesToEdit = (props) => {

    const listingBoxes = props.boxes;

    const button = document.querySelector(".heart-like-button");

    const[isSold, setSold] = useState(false);

    const[isSellStatus, setSellStatus] = useState({
      productSellStatus: listingBoxes.sellStatus
    });

    const[isDeleted, setDeleted] = useState(false);

    const[isIncreased, setIncreased] = useState(false);

    const[changeLike, setLike] = useState({
        productLike: listingBoxes.like
    })
    //Handler to change the number of like by 1 whenever the like button is pressed
    const likesChange = (p) => {
        if(!isIncreased){
            p.productLike += 1;
            setLike({...changeLike, productLike : p.productLike})
            setIncreased(true)
        } else {
            p.productLike = p.productLike;
            setLike({...changeLike, productLike : p.productLike})
            setIncreased(false)
        }
        
        console.log(p.productLike)
        console.log(changeLike.productLike)
    }

    useEffect(() => {
        console.log(isDeleted)
        console.log(changeLike)

        if(isSellStatus.productSellStatus === "available"){
          console.log("This is")
          console.log(isSellStatus.productSellStatus)
          setSold(false)
          console.log(isSold)
        } else {
          setSold(true)
        }

    }, [isDeleted, changeLike])

    const submitted = () => {
      const formdata= new FormData();
      formdata.append("productName",listingBoxes.productName);
      formdata.append("price",listingBoxes.price);
      formdata.append("condition",listingBoxes.condition);
      formdata.append("category",listingBoxes.category);
      formdata.append("description",listingBoxes.description);
      formdata.append("postDate",listingBoxes.postDate);
      formdata.append("like",listingBoxes.like);
      formdata.append("sellStatus", "sold");
      formdata.append("productPicture", listingBoxes.productPicture);
      formdata.append("userId",'624e7d7ea43eebb33e5c7819')
      formdata.append("event",'products');
      formdata.append("paymentType",listingBoxes.paymentType)
      console.log(Object.fromEntries(formdata)) 
      let edit_url = "http://localhost:3001/products/"+listingBoxes._id;
      fetch(edit_url, {
        method: "PUT", credentials: 'include',// or 'PUT'
        body:(formdata) 
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => console.log("Success:", response));
        alert("Edited to sold!");
    };
    //Function to call APR to delete the product
    function deleteproduct(){
      const answer=window.confirm("Are you sure to delete?");
      console.log(answer)
      if(answer){
        
       let url = "http://localhost:3001/products";
       let method = "DELETE";
       const queryParams = "/";
       const queryValue = listingBoxes._id;
       url = url + queryParams + queryValue;
       console.log(url);
      
        fetch(url, { method: method, credentials: 'include' })
         .then((res) => {
           if (res.status !== 200) {
             //If there is any error, statusCode will not be 200 and will throw error
             throw new Error("Failed to fetch products.");
           }
           //Return response data to the next then block
           return res.json();
         })
        
 
      alert("Delete Success!")
      window.location.href = "/userProducts"
      }
    }


//Product boxes that are shown in the edit page of profile page
  return (
    <div className="ListingBox">
        <div className="container" key={listingBoxes.id}>
          <div className="top">
            <div className="grid-item-1">
            <img src={"http://localhost:3001/" + props.profilePic} id="listingBox_profileImg"/>
            </div>
            <div className="grid-item-2">
              {props.userName}
            </div>
            <div className="grid-item-3">
              {listingBoxes.postDate.slice(0,10)}
            </div>
          </div>

          <div className="middle">
            <div className={isSold ? "soldBox" : "soldBox disappear"}>
                Sold
            </div>
            <img src={"http://localhost:3001/" + listingBoxes.productPicture} id="listingBox_img"/>
          </div>

          <div className="bottom">
            <div className="listingName">
              {listingBoxes.productName}
            </div>
            <div className="price">
              ${listingBoxes.price}
            </div>
            <div className="condition">
              {listingBoxes.condition}
            </div>
            <div className="likes">
              {changeLike.productLike}
              <div className="buttonBox" onClick={() => {likesChange({...changeLike, productLike : listingBoxes.like})}}><IconButton><FavoriteBorderSharpIcon/></IconButton></div>
              <button className={isSold ? "soldButton disappear" : "soldButton"} onClick={() => {setSold(!isSold); submitted()}}>Sold</button>

              <button className="deleteButton"onClick={() => {setDeleted(!isDeleted); deleteproduct()}}>Delete</button>
            
            </div>
          </div>
        </div>

    </div>
  )
}

export default ProductBoxesToEdit