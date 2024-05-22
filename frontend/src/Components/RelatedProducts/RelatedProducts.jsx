import React from 'react'
import './RelatedProducts.css'
import Item from '../Item/Item'
import { useState, useEffect } from 'react'



const RelatedProducts = (props) => {
  const{product} = props;
  const [relatedProducts,setRelatedProducts] = useState([]);

  useEffect(()=>{
    const productData = {
      category: product.category,
    };
    fetch('http://localhost:4000/relatedproduct',{
      method:'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type':'application/json',
    },
    body: JSON.stringify(productData)
    })
    .then((response)=>response.json())
    .then((data)=>setRelatedProducts(data));
  },[])


  return (
    <div className='relatedproducts'>
        <h1>Related Products</h1>
        <hr/>
        <div className='relatedproducts-item'>
            {relatedProducts.map((item, i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}

export default RelatedProducts