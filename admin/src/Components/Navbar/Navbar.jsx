import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/nav-logo.svg'
import navprofile from '../../assets/nav-profile.svg'


const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={navlogo} alt="" className='nav-logo'></img>
        <img src={navprofile} alt="" className='nav-profile'></img>
    </div>
  )
}

export default Navbar