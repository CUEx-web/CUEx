/*
Header Comment Block
What: User cards that contain user inforamtion
Who: Programmer:　THALANG Ikshahang
Where: All User Page
When: Version : 13-04-2022
Why: Purpose: To show all the information of user
Data Structure: Products
{
userName: string
email: string
userType: string
studentId: string
grade: string
profilePicture: string
}
*/
import React from 'react'
import { Link } from 'react-router-dom';
import "../UserCard.css";

const UserCard = (props) => {

    const userCards = props.boxes;

  return (
    <Link className='UserCardBigBox' to={{pathname:"/PersonalProfile", 
        state:{
            userIDID: userCards._id
        }}}>
        <div className='UserCardItem-1'>
            <img src={"http://localhost:3001/" + userCards.profilePicture} id="userCard_profileImg"/>
        </div>
        <div className='UserCardItem-2'>
            <div className='UserCard-username'>
                Username: {userCards.userName}
            </div>
            <div className='UserCard-email'>
                Email: {userCards.email}
            </div>
        </div>
        <div className='UserCardItem-3'>
            <div className='UserCard-regDate'>
                Registration date: {userCards.registrationDate.slice(0,10)}
            </div>
            <div className='UserCard-studentId'>
                Student ID: {userCards.studentId}
            </div>
        </div>
        <div className='UserCardItem-4'>
            <div className='UserCard-userType'>
                User type: {userCards.userType}
            </div>
            <div className='UserCard-status'>
                Status: {userCards.status}
            </div>
        </div>

    </Link>
  )
}

export default UserCard