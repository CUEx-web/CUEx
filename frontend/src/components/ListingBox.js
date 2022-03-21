import "../ListingBox.css";
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import { IconButton } from '@mui/material';
import { useState } from "react";

const ListingBox = (props) => {
  const listingBoxes = props.boxes;

  const button = document.querySelector(".heart-like-button");



  return (
    <a href="http://www.google.com" className="ListingBox">
        <div className="container" key={listingBoxes.id}>
          <div className="top">
            <div className="grid-item-1">

            </div>
            <div className="grid-item-2">
    
            </div>
            <div className="grid-item-3">
    
            </div>
          </div>

          <div className="middle">
            middle
          </div>

          <div className="bottom">
            <div className="listingName">
              {listingBoxes.listingName}
            </div>
            <div className="price">
              {listingBoxes.price}
            </div>
            <div className="condition">
              {listingBoxes.condition}
            </div>
            <div className="likes">
              {listingBoxes.likes}
              <div className="buttonBox"><IconButton><FavoriteBorderSharpIcon/></IconButton></div>
            
            </div>
          </div>
        </div>

    </a>
  )
}

export default ListingBox