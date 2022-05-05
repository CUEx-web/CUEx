/* Header Comment Block For Product Module
Module Name: Product 
Programmer: 	Yuen, Ho Tin, Andrew
Usage: 		This module is used when we needed to handle the product. 
Last Update: 	13-04-2022 
Purpose:		This Built the whole structure of the product, including displaying, 
uploading, updating, deleting
Data Structure: A product have Data Structure Below: 
			{
productName : String,
price: Float,
productPicture : URL,
category: Integer,
description :String,
sellStatus: String,
like :Integer,
condition:String,
paymentType: String,
userId “string”,
postDate Date
			}
Key Algorithm: When upload/update product, we used a form to store the value of 
the form. 
When upload/update product, we used an image handler to handle 
the image uploaded by the user.
*/

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ProductPageBody from "./ProductPageBody";
import Footer from "./Footer.js";
import "../SearchResultPage.css";

import { useParams } from "react-router-dom";

function ProductPage(props) {
  const { product_id } = useParams();
  let [product,setProduct]=useState([])
  let[userid,setUserid]=useState({})
  let [postDate,setPostDate]=useState("")
  let url = "http://localhost:3001/products";
  let method = "GET";

  //Fetch the Product using the product id 
  const queryParams = "/";
  const queryValue = product_id;
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
      setProduct(resData)
      setUserid(resData.userId)
      setPostDate(resData.postDate)
    
    })
  },[]) 
    //Finish fetch the Product using the product id 
  return (
    <div className="ProductPage">
      <Navbar />
      <ProductPageBody  product={product} userid={userid} postDate={postDate}/>
      <Footer />
    </div>
  );
}

export default ProductPage;
