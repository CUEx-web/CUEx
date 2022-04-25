import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer.js';
import "../SearchResultPage.css"
import UploadlistingBody from './UploadlistingBody.js'

const SearchResultPage = () => {
  //The body part of upload page  will be directed to the UploadlistingBody 
  return (
    <div className='SearchResultPage'>
        <Navbar />
        <UploadlistingBody />
        <Footer />
    </div>   
  )
}

export default SearchResultPage