import React from 'react'
import "./Footer.css"
import { assets } from "../../assets/assets"

const Footer = () => {
    return (
        <div className="footer" id="footer">
            <div className='footer-content'>
                <div className="footer-content-left">
                    <img src={assets.logo}></img>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, eligendi tenetur, omnis dolores aliquid odit dolorum reiciendis eaque a ipsam sit perspiciatis voluptatum cupiditate fuga dolorem, dolore minima sed deleniti?</p>
                    <div className='footer-social-icons'>
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className='footer-content-center'>
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li> About Us </li>
                        <li> Delivery</li>
                        <li> Privacy Policy</li>
                    </ul>

                </div>
                <div className='footer-content-right'>
                    <h2>GET IN TOUCh</h2>
                    <ul>
                        <li>+963-235-987-9876</li>
                        <li>contact@tomato.com</li>
                    </ul>
                </div>
            </div>
            <hr></hr>
            <p className='footer-copyright'> Copyright 2024 &copy; Tomato.com- All Right Reserved. </p>


        </div>
    )
}

export default Footer