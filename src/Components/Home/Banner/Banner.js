import React from 'react';
import { Link } from 'react-router-dom';
import background from "../../../red-onion/images/bannerbackground.png"
const Banner = () => {

    return (
      
      <div
      style={{ backgroundImage: `url(${background})`, backgroundSize:"cover" }}
      className="hero min-h-screen text-center"
    >
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="pl-2" >
          <h1 className="text-5xl font-bold ">Best Foods Waiting For Your Belly</h1>
          
          <Link to="/cart" className="btn btn-primary rounded-full ... mt-10">Get Started</Link>
          
        </div>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img
          src={require("../../../red-onion/images/cook.png")}
          className="max-w-sm rounded-lg"/>
        
      </div>
    </div>
    );
};

export default Banner;