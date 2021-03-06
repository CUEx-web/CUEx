/*
Header Comment Block
What: Boxes to store products fetched from API
Who: Programmer:　THALANG Ikshahang
Where: Search page and main page
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
import "../ListingBox.css";
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import { IconButton } from '@mui/material';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ListingBox = (props) => {
  const listingBoxes = props.boxes;

  const button = document.querySelector(".heart-like-button");

  const[isIncreased, setIncreased] = useState(false);

  const[changeLike, setLike] = useState({
    productLike: listingBoxes.like
  })

  var productlink = "/product/" + listingBoxes._id;


  const listingBoxesLikesChange = (p) => {
    if(!isIncreased){
      p.productLike += 1;
      listingBoxes.like = p.productLike
      setIncreased(true)
  } else {
      p.productLike -= 1;
      listingBoxes.like = p.productLike
      setIncreased(false)
  }
  }

  useEffect(() => {
    console.log(changeLike)
  }, [changeLike, listingBoxes.like])

  return (
    <div className="big-box">
    <Link className="ListingBox" to={{ pathname:productlink}}>
        <div className="container" key={listingBoxes._id}>
          <div className="top">
            <div className="grid-item-1">
            <img src={"http://localhost:3001/" + listingBoxes.userId.profilePicture} id="listingBox_profileImg"/>
            </div>
            <div className="grid-item-2">
            {listingBoxes.userId.userName}
            </div>
            <div className="grid-item-3">
              {listingBoxes.postDate.slice(0,10)}
            </div>
          </div>

          <div className="middle">
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
            
            
          </div>
        </div>

    </Link>
        <div className="likes">
              {listingBoxes.like}
              <div className="buttonBox" onClick={() => {listingBoxesLikesChange({...listingBoxes, productLike : listingBoxes.like})}}><IconButton><FavoriteBorderSharpIcon/></IconButton></div>
            
            </div>
      
    </div>
  )
}

export default ListingBox