import React from 'react'
import Navbar from './Navbar'
import SearchBody from './SearchBody'
import Footer from './Footer.js';
import "../SearchResultPage.css"
import { useLocation } from 'react-router-dom';
import { ProductionQuantityLimitsTwoTone } from '@mui/icons-material';

const SearchResultPage = () => {
  const location = useLocation();
  const { tag, tag1, tag2, tag3, tag4, query } = location.state;
  console.log(tag);
 // Body for search page
  return (
    <div className='SearchResultPage'>
        <Navbar />
        <SearchBody tag={tag} tag1={tag1} tag2={tag2} tag3={tag3} tag4={tag4} query={query}/>
        <Footer />
    </div>   
  )
}

export default SearchResultPage