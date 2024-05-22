import React from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import Item from '../Item/Item'
import { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import { useState } from 'react';


const ProductDisplay = (props) => {
    const{product} = props;
    const {addToCart} = useContext(ShopContext);
    const [highlightedIndex, setHighlightedIndex] = useState(null);

    const highlight = (index) => {
        setHighlightedIndex(index);
    };

  return (
    <div className='productdisplay'>
        <div className='productdisplay-left'>
            <div className="productdisplay-img-list">
                <img src={product.image} alt=""></img>
                <img src={product.image} alt=""></img>
                <img src={product.image} alt=""></img>
                <img src={product.image} alt=""></img>
            </div>
            <div className='productdisplay-img'>
                <img className='productdisplay-main-img' src={product.image}></img>
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className='productdisplay-right-stars'>
                <img src={star_icon} alt=""></img>
                <img src={star_icon} alt=""></img>
                <img src={star_icon} alt=""></img>
                <img src={star_icon} alt=""></img>
                <img src={star_dull_icon} alt=""></img>
                <p>(122)</p>
            </div>
            <div className='productdisplay-right-prices'>
                <div className='productdisplay-right-price-old'>${product.old_price}</div>
                <div className='productdisplay-right-price-new'>${product.new_price}</div>
            </div>
            <div className='productdisplay-right-description'>
                This is the product description
            </div>
            <div className='product-display-right-size'>
                <h1>Select Size</h1>
                <div className='product-display-right-sizes'>
                    <div className={highlightedIndex === 0 ? 'highlighted' : ''} onClick={() => highlight(0)}>S</div>
                    <div className={highlightedIndex === 1 ? 'highlighted' : ''} onClick={() => highlight(1)}>M</div>
                    <div className={highlightedIndex === 2 ? 'highlighted' : ''} onClick={() => highlight(2)}>L</div>
                    <div className={highlightedIndex === 3 ? 'highlighted' : ''} onClick={() => highlight(3)}>XL</div>
                    <div className={highlightedIndex === 4 ? 'highlighted' : ''} onClick={() => highlight(4)}>XXL</div>
                </div>
            </div>
            <button onClick={()=> {addToCart(product.id)}}>ADD TO CART</button>
            <p className='productdisplay-right-category'><span>Category : </span>Women, T-Shirt, Crop Top</p>
            <p className='productdisplay-right-category'><span>Tags : </span>Modern, Latest</p>
        </div>
    </div>
  )
}

export default ProductDisplay