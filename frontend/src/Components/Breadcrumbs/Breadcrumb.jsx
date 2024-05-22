import React from 'react'
import './Breadcrumb.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'

const Breadcrumb = (props) => {
    const {product} = props;

  return (
    <div className='breadcrumb'>
        HOME <img src={arrow_icon} alt=""></img> SHOP <img src={arrow_icon} alt=""></img> {product.category} <img src={arrow_icon} alt=""></img> {product.name}
    </div>
  )
}

export default Breadcrumb