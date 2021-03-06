/*
Header Comment Block
What: Program to show all the products in CUEx
Who: Programmer:　THALANG Ikshahang
Where: Main page
When: Version : 13-04-2022
Why: Purpose: The user can browse through all products 		   
Data Structure: None
*/
import "../RecommendedSection.css";
import ListingBox from '../components/ListingBox.js';
import { useState, useEffect } from "react";

const RecommendedSection = () => {
  const product = new Array(8).fill(0);
//Using API to fetch the products that matches the query citerion
  let url = "http://localhost:3001/products";
  let method = "GET";

  const queryParams = "?productName=";
  const queryValue = "Test";
  url = url;
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
      //Log the return data in the terminal

      console.log(resData);
      setLisitngBoxes(resData)
    })

  },[]) 

  const[listingBoxes, setLisitngBoxes] = useState([]);

  console.log(listingBoxes)


  const [isEnd, viewIsEnd] = useState();



  const [visible, setVisible] = useState(4);
  //Hander to show 4 boxes at a time
  const showMoreListingBoxes = () => {
    setVisible((prevValue) => prevValue + 4 );
  };
  // Function to show fetchted products in recommended section
  return (
    <div className='RecommendedSection'>
        <div className="Heading">
            Recommended for you
        </div>
        <div className="RecommendedSectionContainer">
          {listingBoxes.slice(0,visible).map(function(item, i){
            return <ListingBox boxes={item} key={i} />;
          })}
        </div>
        <div className="ButtonBox">
          <button className="viewMore" onClick={showMoreListingBoxes}>View more</button>
        </div>
    </div>
  )
}

export default RecommendedSection