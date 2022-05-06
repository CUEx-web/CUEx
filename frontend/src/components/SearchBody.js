/*
Header Comment Block
What: Program to show the products with matched searched queries
Who: Programmer:　THALANG Ikshahang
Where: Search page
When: Version : 13-04-2022
Why: Purpose: The user can conveniently search and filter products.   		   
Data Structure: None

Key Algorithm: Sort products by different criterias
               Filter products by different conditions
               Filter products by different deal 
*/

import React from 'react'
import "../SearchBody.css"
import ListingBox from '../components/ListingBox.js';
import { useState, useEffect } from "react";
import { Identity } from '@mui/base';
import { DevicesFoldOutlined, ProductionQuantityLimits, Task } from '@mui/icons-material';


const SearchBody = (props) => {
  const { tag, query } = props;
  const[isShown1, listIsShown1] = useState(false);
  const[isShown2, listIsShown2] = useState(false);
  const[isShown3, listIsShown3] = useState(false);
  const[isShown4, listIsShown4] = useState(false);

  const[isProductName, setProductName] = useState('');

  
  //Changing tag numbers to product tags
  const[isProductTag, setProductTag] = useState('');  
  useEffect(() => {
    setProductName(query);

    if(tag === ""){
      setProductTag("")
    }
    if(tag === "1"){
      // catergories = "Academic books"
      setProductTag("Academic books")
      console.log("passed")
    }
    if(tag === "2"){
      // catergories = "Fiction books"
      setProductTag("Fiction books")
    }
    if(tag === "3"){
      // catergories = "Non-fiction books"
      setProductTag("Non-fiction books")
    }
    if(tag === "4"){
      // catergories = "Women's fashion"
      setProductTag("Women's fashion")
    }
    if(tag === "5"){
      //catergories = "Men's fashion"
      setProductTag("Men's fashion")
    }
    if(tag === "6"){
      //catergories = "Luxury"
      setProductTag("Luxury")
    }
    if(tag === "7"){
      //catergories = "Food & drinks"
      setProductTag("Food & drinks")
    }
    if(tag === "8"){
      //catergories = "Beauty & Personal Care"
      setProductTag("Beauty & Personal Care")
    }
    if(tag === "9"){
      //catergories = "Furniture & Home Living"
      setProductTag("Furniture & Home Living")
    }
    if(tag === "10"){
      //catergories = "Pet supplies"
      setProductTag("Pet supplies")
    }
    if(tag === "11"){
      //catergories = "Music accessories"
      setProductTag("Music accessories")
    }
    if(tag === "12"){
      //catergories = "Video games"
      setProductTag("Video games")
    }
    if(tag === "13"){
      //catergories = "Photography"
      setProductTag("Photography")
    }
    if(tag === "14"){
      //catergories = "Sports equipment"
      setProductTag("Sports equipment")
    }
    if(tag === "15"){
      //catergories = "Computer hardware"
      setProductTag("Computer hardware")
    }
    if(tag === "16"){
      //catergories = "Mobile phones"
      setProductTag("Mobile phones")
    }
    if(tag === "17"){
      //catergories = "Electronic accessories"
      setProductTag("Electronic accessories")
    }
    if(tag === "18"){
      //catergories = "Jobs"
      setProductTag("Jobs")
    }
    if(tag === "19"){
      //catergories = "Services"
      setProductTag("Services")
    }
    if(tag === "20"){
      //catergories = "Free items"
      setProductTag("Free items")
    }
    if(tag === "21"){
      //catergories = "Books"
      setProductTag("Books")
    }
    if(tag === "22"){
      //catergories = "Fashion"
      setProductTag("Fashion")
    }
    if(tag === "23"){
      //catergories = "Living"
      setProductTag("Living")
    }
    if(tag === "24"){
      //catergories = "Hobbies & games"
      setProductTag("Hobbies & games")
    }
    if(tag === "25"){
      //catergories = "Electronics & Technology"
      setProductTag("Electronics & Technology")
    }
    if(tag === "26"){
      //catergories = "Jobs & services"
      setProductTag("Jobs & services")
    }
  }, [tag, query])
  // Fetching products that matches the API queries (categories and product name)
  let url = "http://localhost:3001/products";
  let method = "GET";


  let queryParams = "";
  let queryValue = "";

  if(tag === ''){
    queryParams = "?productName=";
    queryValue = props.query;
  }

  if(props.query === ''){
    queryParams = "?category="
    queryValue = "[" + tag + "]";


    if(tag == "21"){
      queryValue = "[1,2,3]"
    }
    if(tag == "22"){
      queryValue = "[4,5,6]"
    }
    if(tag == "23"){
      queryValue = "[7,8,9,10]"
    }
    if(tag == "24"){
      queryValue = "[11,12,13,14]"
    }
    if(tag == "25"){
      queryValue = "[15,16,17]"
    }
    if(tag == "25"){
      queryValue = "[18,19,20]"
    }
  }


  const[originalBoxes, setOriginalBoxes] = useState([]);

  const[listingBoxes, setLisitngBoxes] = useState([]);
  url = url + queryParams + queryValue;
  //Calling the API with the constructed queries (categories and product name)
  useEffect(()=>{
    console.log(url);
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
      setLisitngBoxes(resData)
      setOriginalBoxes(resData)
    })


  },[isProductTag, isProductName])


  const [visible, setVisible] = useState(4);

  //Handler for "View more" button to show 4 more product boxes
  const showMoreListingBoxes = () => {
    setVisible((prevValue) => prevValue + 4 );
  };

  const [isEnd, viewIsEnd] = useState();

  const [isCheck, setCheck] = useState({
    new : false,
    well_used : false,
    heavily_used: false,
    monetary: false,
    goods: false,
    monetaryAndGoods: false
  });

  const sortMost = {
    most_popular: false,
    recent: false,
    priceHigh: false,
    priceLow: false
  }

  const [isRadio, setRadio] = useState(
    sortMost
  );
// Function to sort products by most likes
  const sortingByLikes = () => {
    return listingBoxes.sort((a, b) => {
        if (a.like < b.like) return 1;
        else if (b.like < a.like) return -1;
      return 0;
    })

    console.log(listingBoxes)
  }
// Function to sort products by recent dates
  const sortingByDateRecent = () => {
    return listingBoxes.sort((a, b) => {
        if (a.postDate < b.postDate) return 1;
        else if (b.postDate < a.postDate) return -1;
      return 0;
    })
    console.log(listingBoxes)
  }
// Function to sort products by lowest to highest price
  const sortingByPriceLow = () => {
    return listingBoxes.sort((a, b) => {
        if (a.price < b.price) return -1;
        else if (b.price < a.price) return 1;
      return 0;
    })
    console.log(listingBoxes)
  }
// Function to sort products by highest to lowest price
  const sortingByPriceHigh = () => {
    return listingBoxes.sort((a, b) => {
        if (a.price < b.price) return 1;
        else if (b.price < a.price) return -1;
      return 0;
    })
    console.log(listingBoxes)
  }
// Function to enable different modes of the "Sort" button
  const sortBoxes = (p) => {
      let boxes;
  
      if(p.most_popular){
        boxes = sortingByLikes()
      } else if (p.recent){
        boxes = sortingByDateRecent()
      } else if (p.priceLow){
        boxes = sortingByPriceLow()
      } else if (p.priceHigh){
        boxes = sortingByPriceHigh()
      }
      console.log(boxes)
      setLisitngBoxes([...boxes])
  }

  // Function to enable different modes of the "Condition" and "Deal" buttons
  const filterItems = (p) => {
    console.log(isCheck)
    let boxes;
    
    if(p.new){
      boxes = listingBoxes.filter(listingBoxes => listingBoxes.condition === 'New');
    }
    else if(p.well_used){
      boxes = listingBoxes.filter(listingBoxes => listingBoxes.condition === 'Well used');
    }
    else if(p.heavily_used){
      boxes = listingBoxes.filter(listingBoxes => listingBoxes.condition === 'Heavily used');
    }
    else if(p.monetary){
      boxes = listingBoxes.filter(listingBoxes => listingBoxes.paymentType === 'Monetary');
    }
    else if(p.goods){
      boxes = listingBoxes.filter(listingBoxes => listingBoxes.paymentType === 'goods');
    }
    else if(p.monetaryAndGoods){
      boxes = listingBoxes.filter(listingBoxes => listingBoxes.paymentType === 'Monetary and goods');
    }
    else if(!p.new && !p.well_used && !p.heavily_used && !p.monetary && !p.goods && !p.monetaryAndGoods){
      boxes = originalBoxes
    }
    
    console.log(boxes)
    setLisitngBoxes([...boxes])
  }

// Body of the search page container
  return (
    <div className='SearchBody'>
        <div className='Heading'>
        {originalBoxes.length} search results for {isProductTag} {isProductName}
        </div>
        <div className='FilterBar'>
           
        <button onClick={() => {listIsShown1(!isShown1); listIsShown2(false); listIsShown3(false); listIsShown4(false);}}>
                Sort
            </button>
            <div className={isShown1 ? "sort" : "sort disappear"}>
                <label htmlFor='sort-1'>
                    <input type='radio' name="sortingWay" id='sort-1' onChange={() => {sortBoxes({...sortMost, most_popular : true})}}>
                    </input>
                    Most popular
                </label>
                <label htmlFor='sort-2'>
                    <input type='radio' name="sortingWay" id='sort-2'onChange={() => {sortBoxes({...sortMost, recent : true})}}>
                    </input>
                    Recent
                </label>
                <label htmlFor='sort-3'>
                    <input type='radio' name="sortingWay" id='sort-3' onChange={() => {sortBoxes({...sortMost, priceHigh: true})}}>
                    </input>
                    Price - High to Low
                </label>
                <label htmlFor='sort-4'>
                    <input type='radio' name="sortingWay" id='sort-4' onChange={() => {sortBoxes({...sortMost, priceLow: true})}}>
                    </input>
                    Price - Low to High
                </label>
            </div>

            <button onClick={() => {listIsShown2(!isShown2); listIsShown1(false); listIsShown3(false); listIsShown4(false);}}>
                Condition
            </button>
            <div className={isShown2 ? "condition " : "condition disappear"}>
                <label htmlFor='condition-1'>
                    <input type='checkbox' id='condition-1' onChange={() => {filterItems({...isCheck, new : !isCheck.new}); setCheck({...isCheck, new : !isCheck.new})}}>
                    </input>
                    New
                </label>
                <label htmlFor='condition-2'>
                    <input type='checkbox' id='condition-2' onChange={() => {filterItems({...isCheck, well_used : !isCheck.well_used}); setCheck({...isCheck, well_used : !isCheck.well_used})}}>
                    </input>
                    Well Used
                </label>
                <label htmlFor='condition-3'>
                    <input type='checkbox' id='condition-3' onChange={() => {filterItems({...isCheck, heavily_used : !isCheck.heavily_used}); setCheck({...isCheck, heavily_used : !isCheck.heavily_used})}}>
                    </input>
                    Heavily Used
                </label>
            </div>
            
            <button onClick={() => {listIsShown3(!isShown3); listIsShown2(false); listIsShown1(false); listIsShown4(false);}}>
                Deal
            </button>
            <div className={isShown3 ? "deal" : "deal disappear"}>
                <label htmlFor='deal-1' onChange={() => {filterItems({...isCheck, monetary : !isCheck.monetary}); setCheck({...isCheck, monetary : !isCheck.monetary})}}>
                    <input type='checkbox' id='deal-1'>
                    </input>
                    Monetary
                </label>
                <label htmlFor='deal-2' onChange={() => {filterItems({...isCheck, goods : !isCheck.goods}); setCheck({...isCheck, goods : !isCheck.goods})}}>
                    <input type='checkbox' id='deal-2'>
                    </input>
                    Goods
                </label>
                <label htmlFor='deal-3' onChange={() => {filterItems({...isCheck, monetaryAndGoods : !isCheck.monetaryAndGoods}); setCheck({...isCheck, monetaryAndGoods : !isCheck.monetaryAndGoods})}}>
                    <input type='checkbox' id='deal-3'>
                    </input>
                    Monetary and goods
                </label>
            </div>

            <div className={isShown4 ? "price" : "price disappear"}>
                <label htmlFor='price-1'>
                    <input type='number' id='price-min'>
                    </input>
                    -
                    <input type='number' id='price-max'>
                    </input> 
                </label>
            </div>
        </div>


        <div className="SearchResultContainer">
          {listingBoxes.map(function(item, i){
            return <ListingBox boxes={item} key={i} />;
          })}
        </div>
        <div className="SearchButtonBox">
          <button className="SearchViewMore" onClick={showMoreListingBoxes}>View more</button>
        </div>

    </div>
  )
}

SearchBody.defaultProps = {
  tag: '',
  tag1: '',
  tag2: '',
  tag3: '',
  tag4: '',
  query: ''
}

export default SearchBody