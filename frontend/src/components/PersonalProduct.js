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

  const showMoreListingBoxes = () => {
    setVisible((prevValue) => prevValue + 4 );
  };

  const [isEnd, viewIsEnd] = useState();

  return (
    <div className='RecommendedSection'>
        <div className="PersonalHeading">
            Your Product
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