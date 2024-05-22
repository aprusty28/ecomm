import React from 'react'
import Footer from '../Components/Footer/Footer'
import Home from '../Components/Home/Home'
import NewCollections from '../Components/NewCollections/NewCollections'
import NewsLetter from '../Components/NewsLetter/NewsLetter'
import Offers from '../Components/Offers/Offers'
import Popular from '../Components/Popular/Popular'

const Shop = () => {
  return (
    <div>
      <Home/>
      <Popular/>
      <Offers/>
      <NewCollections/>
      <NewsLetter/>
    </div>
  )
}

export default Shop