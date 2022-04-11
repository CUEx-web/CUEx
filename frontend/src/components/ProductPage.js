import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ProductPageBody from "./ProductPageBody";
import Footer from "./Footer.js";
import "../SearchResultPage.css";

import { useParams } from "react-router-dom";

function ProductPage(props) {
  const { product_id } = useParams();
  const id = product_id - 1; /*return the array element */

  let [product,setProduct]=useState([])
  let[userid,setUserid]=useState({})
  let [postDate,setPostDate]=useState("")
  let url = "http://localhost:3001/products";
  let method = "GET";

  //Second Example, GET products with productName = "Test"
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
  return (
    <div className="ProductPage">
      <Navbar />
      <ProductPageBody  product={product} userid={userid} postDate={postDate}/>
      <Footer />
    </div>
  );
}

export default ProductPage;
