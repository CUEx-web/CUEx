import React from "react";
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import EditForm from "./EditForm.js";
import "../EditProfile.css";

import { useLocation } from 'react-router-dom';

function EditProfile(props){

  const location = useLocation();
  const { userIDID } = location.state;

  // console.log(userIDID)

    return (
        <div className="editProfileBox">
          <div className="editcontainer">
            <Navbar />
          <h1 className="editheading">Changing Your Profile ... </h1>
            <EditForm  userIDID={userIDID}/>

            <Footer />
          </div>
        </div>

      );

}

export default EditProfile;
