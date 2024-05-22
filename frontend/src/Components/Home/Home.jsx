import React from 'react'
import './Home.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image.png'



const Home = () => {
  return (
    <div className='home'>
        <div className='home-left'>
            <h2>NEW COLLECTIONS ONLY</h2>
            <div>
                <div className='home-hand-icon'>
                    <p>new</p>
                    <img src={hand_icon}></img>

                </div>
                <p>collections</p>
                <p>for everyone</p>
            </div>
            <div className='home-latest-btn'>
                <div>Latest Collection</div>
                <img src={arrow_icon}></img>
            </div>

        </div>
        <div className='home-right'>
            <img src={hero_image}></img>

        </div>
    </div>
  )
}

export default Home