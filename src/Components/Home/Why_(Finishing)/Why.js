import React, { useState } from "react";

const Why = () => {
    const [showMore, setShowMore] = useState(false);
    const [showMore1, setShowMore1] = useState(false);
    const [showMore2, setShowMore2] = useState(false);
    const deliverytext = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur porro facilis quod. Esse mollitia nostrum eligendi nihil tempora laborum aut repudiandae vero rem officia odio quidem ea doloribus quis, nobis ab officiis molestias at accusantium pariatur. Nam voluptatem itaque velit."
    const cheftext = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur porro facilis quod. Esse mollitia nostrum eligendi nihil tempora laborum aut repudiandae vero rem officia odio quidem ea doloribus quis, nobis ab officiis molestias at accusantium pariatur. Nam voluptatem itaque velit."
    const hdtext = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur porro facilis quod. Esse mollitia nostrum eligendi nihil tempora laborum aut repudiandae vero rem officia odio quidem ea doloribus quis, nobis ab officiis molestias at accusantium pariatur. Nam voluptatem itaque velit."
  return (
    <div data-aos="zoom-in"className="m-5">
      <h1 className="text-4xl">Why You Choose Us</h1>
      <p className="max-w-md">
        It is the best restaurant for its breakfast, dinner and lunch. Many
        people from many place come here to order their favourite meal
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 px-3 mt-5">
        <div className="card bg-base-100 shadow-xl">
          <figure>
            <img src={require("../../../red-onion/images/adult-blur-blurred-background-687824.png")} alt="fast delivery" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              <div><img src={require("../../../red-onion/images/icons/Group 204.png")} alt="fast" /></div>
              Fast Delivery
            </h2>
            {
                showMore ? deliverytext : `${deliverytext.substring(0,100)}`
            }
            <button className="font-bold" style={{color:"blueviolet"}} onClick={()=> setShowMore(!showMore)}>
                {showMore ? "See Less" : "See More"}
            </button>
          </div>
        </div>
        {/*  */}
        <div className="card bg-base-100 shadow-xl">
          <figure>
            <img src={require("../../../red-onion/images/chef.png")} alt="chef" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
            <div><img src={require("../../../red-onion/images/icons/Group 2.png")} alt="fast" /></div>Experienced Chef
            </h2>
            {
                showMore1 ? cheftext : `${cheftext.substring(0,100)}`
            }
            <button className="font-bold" style={{color:"blueviolet"}} onClick={()=> setShowMore1(!showMore1)}>
                {showMore1 ? "See Less" : "See More"}
            </button>
          </div>
        </div>
        {/*  */}
        <div className="card bg-base-100 shadow-xl">
          <figure>
            <img src={require("../../../red-onion/images/architecture-building-city-2047397.png")} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
            <div><img src={require("../../../red-onion/images/icons/Group 245.png")} alt="fast" /></div>
              Home Delivery
            </h2>
            {
                showMore2 ? hdtext : `${hdtext.substring(0,100)}`
            }
            <button className="font-bold" style={{color:"blueviolet"}} onClick={()=> setShowMore2(!showMore2)}>
                {showMore2 ? "See Less" : "See More"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Why;
