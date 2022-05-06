import React from 'react'
import { useState, useEffect } from "react";
import UserCard from './UserCard';
import "../AllUserPageBody.css";

const AllUserPageBody = () => {
    
    const[userCards, setUserCards] = useState([]);

    let urlabc = "http://localhost:3001/users/";
    let methodabc = "GET";

    useEffect(()=>{
        fetch(urlabc, { method: methodabc })
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
          setUserCards(resData);
        })
      },[])

  return (
    <div className='AllUserPageBodyBox'>
        <div className='Heading'>
            All Users in CUEx
        </div>
        {/* Showing all the UserCards */}
        <div className='UserCardSection'>
            {userCards.map(function(item, i){
                return <UserCard boxes={item} key={i} />;
            })}
            
        </div>
    </div>
  )
}

export default AllUserPageBody