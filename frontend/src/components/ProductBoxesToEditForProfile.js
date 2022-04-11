import React, { useEffect } from 'react'
import "../ProductBoxesToEditForProfile.css";
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import { IconButton } from '@mui/material';
import { useState } from "react";
import { Link } from 'react-router-dom';

const ProductBoxesToEditForProfile = (props) => {
    const listingBoxes = props.boxes;

    const button = document.querySelector(".heart-like-button");

    const[isIncreased, setIncreased] = useState(false);

    const[isSold, setSold] = useState(false);

    const[isSellStatus, setSellStatus] = useState({
      productSellStatus: listingBoxes.sellStatus
    });

    const[changeLike, setLike] = useState({
        productLike: listingBoxes.like
    })

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
        console.log('THis is lisiting boxes')
        console.log(listingBoxes)
        console.log(changeLike)

        if(isSellStatus.productSellStatus === "available"){
          console.log("This is")
          console.log(isSellStatus.productSellStatus)
          setSold(false)
          console.log(isSold)
        } else {
          setSold(true)
        }
    }, [changeLike])

    var productlink = "/product/" + listingBoxes._id;

  return (
    <Link className="ListingBox_profile" to={{ pathname:productlink}}>
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
            <img src={"http://localhost:3001/" + listingBoxes.productPicture} id="listingBox_img_profile"/>
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
            </div>
          </div>
        </div>

    </Link>
  )
}

export default ProductBoxesToEditForProfile