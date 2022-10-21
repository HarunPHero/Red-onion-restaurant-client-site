import React from 'react';
import { Link } from 'react-router-dom';
const Banner = () => {

    return (
      
      <div
     className='lg:text-center'
    >
      <div className="flex flex-col lg:flex-row-reverse">
        <div className='lg:mt-10 ml-5'>
          <h1 className="text-3xl lg:text-4xl font-bold banner-text">Best Foods Waiting <br /> For Your Belly</h1>
          
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