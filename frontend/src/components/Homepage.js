import React from 'react'
import Navbar from './Navbar'
import ExploreSection from './ExploreSection'
import RecommendedSection from './RecommendedSection'
import Footer from './Footer'

const Homepage = () => {
  return (
    // Homepage for CUEx
    <div>        
        <Navbar /> 
        <ExploreSection />
        <RecommendedSection />
        <Footer/>
    </div>
  )
}

export default Homepage