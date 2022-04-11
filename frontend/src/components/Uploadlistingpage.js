import React from 'react'
import Navbar from './Navbar'
import SearchBody from './SearchBody'
import Footer from './Footer.js';
import "../SearchResultPage.css"
import UploadlistingBody from './UploadlistingBody.js'

const SearchResultPage = () => {
  return (
    <div className='SearchResultPage'>
        <Navbar />
        <UploadlistingBody />
        <Footer />
    </div>   
  )
}

export default SearchResultPage