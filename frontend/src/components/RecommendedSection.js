import "../RecommendedSection.css";
import ListingBox from '../components/ListingBox.js';
import { useState } from "react";

const RecommendedSection = () => {
  const product = new Array(8).fill(0);

  const[listingBoxes, setLisitngBoxes] = useState([
    { listingName: 'Bicycle', price: '$10', condition: 'Used', likes: '11', id: 1 },
    { listingName: 'water', price: '$10', condition: 'Used', likes: '11', id: 2 },
    { listingName: 'Bicycle', price: '$10', condition: 'Used', likes: '11', id: 3 },
    { listingName: 'water', price: '$10', condition: 'Used', likes: '11', id: 4 },
    { listingName: 'Bicycle', price: '$10', condition: 'Used', likes: '11', id: 5 },
    { listingName: 'water', price: '$10', condition: 'Used', likes: '11', id: 6 },
    { listingName: 'Bicycle', price: '$10', condition: 'Used', likes: '11', id: 7 },
    { listingName: 'water', price: '$10', condition: 'Used', likes: '11', id: 8 },
    { listingName: 'Bicycle', price: '$10', condition: 'Used', likes: '11', id: 9 },
    { listingName: 'water', price: '$10', condition: 'Used', likes: '11', id: 10 },
    { listingName: 'Bicycle', price: '$10', condition: 'Used', likes: '11', id: 11 },
    { listingName: 'water', price: '$10', condition: 'Used', likes: '11', id: 12 }
  ]);

  const [visible, setVisible] = useState(4);

  const showMoreListingBoxes = async () => {
    setVisible((prevValue) => prevValue + 4 );
    let url = "http://localhost:3001/products";
    let method = "GET";
    //First Example, GET all products
    fetch(url, { method: method })
      .then(res => {
        if (res.status !== 200) {
          //If there is any error, statusCode will not be 200 and will throw error
          throw new Error('Failed to fetch products.');
        }
        //Return response data to the next then block
        return res.json();
      })
      .then(resData => {
        //Log the return data in the terminal, Frontend team can update things here
        console.log(resData);
        //console.log(resData[0]._id);
      })
      .catch(err => console.log(err));

    //Second Example, GET products with productName = "Test"
    // const queryParams = "?category=";
    // const queryValue = JSON.stringify([2,6]);
    // url = url + queryParams + queryValue;
    // console.log(url)
    // fetch(url, { method: method, })
    //   .then(res => {
    //     if (res.status !== 200) {
    //       //If there is any error, statusCode will not be 200 and will throw error
    //       throw new Error('Failed to fetch products.');
    //     }
    //     //Return response data to the next then block
    //     return res.json();
    //   })
    //   .then(resData => {
    //     //Log the return data in the terminal, Frontend team can update things here
    //     console.log(resData);
    //     //console.log(resData[0]._id);
    //   })
    //   .catch(err => console.log(err));
  };

  const [isEnd, viewIsEnd] = useState();

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