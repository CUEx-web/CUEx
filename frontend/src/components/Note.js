import React from "react";

function Note(props) {
  return (
    <div className="personalnote">
    <img className="circle-img" src={props.img} alt="ProfilePicture_img" />
      <h1>{props.username} </h1>
      <p className='ProfileDescription'>{props.content} </p>
      <p className='ProfileDescription'>{props.studentID}</p>
      <p className='ProfileDescription'>{props.grade}</p>
      <p className='ProfileDescription'>{props.email}</p>
      
    </div>
  );
}

export default Note;