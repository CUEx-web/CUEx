import React from 'react'
import Navbar from './Navbar'
import UserProductsBody from './UserProductsBody'

const UserProducts = () => {
  // Body for product page accessed through profile page
  return (
    <div>
        <Navbar/>
        <UserProductsBody/>
    </div>
  )
}

export default UserProducts