import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";

const DinnerModal = ({food}) => {
  const [user] = useAuthState(auth)
  const [counter, setCounter] = useState(1);
  const navigate = useNavigate()

  const incrementCount = () => {
    // Update state with incremented value
    if (counter < 10) {
      setCounter(counter + 1);
    }
  };
  const decrementCount = () => {
    // Update state with incremented value
    setCounter((c) => Math.max(c - 1, 1));
  };
  const price = parseFloat(food?.price * counter).toFixed(2)
  const handleAddToCart = e => {
    e.preventDefault()
    const cartDetails = {
      foodID: food?._id,
      food: food?.name, 
      category:food?.category,
      foodimg:food?.img,     
      customer: user?.displayName,
      email:user?.email,
      quantity: counter,
      uid:user?.uid,
      photo: user.photoURL,
      Price: price,
      paid: false
    }
    fetch(`https://ror-backend-msaj.onrender.com/addcart`, {
      method:"POST",
      headers:{
        'content-type':"application/json"
      },
      body: JSON.stringify(cartDetails)
    })
    .then(res => res.json())
    .then(data => {
      if(data.success){
        toast(`Your cart is added`);
        // window.location.reload()
        navigate("/cart")
        
    }
    else{
      toast.error(`Already added to cart`)
  };
    
    })
   }
  return (
    <>
      <input type="checkbox" id="dinner-modal" className="modal-toggle" />
      <div className="modal">
        <div className="bg-white sm:modal-box sm:w-12/12 sm:max-w-5xl">
        
          <div
      className="hero min-h-screen"
    >
      <div className="hero-content flex-col lg:flex-row-reverse">
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img
          src={food?.img}
          className="rounded-lg w-2/4"/>
        <div>
          <h1 className="text-4xl font-bold ">{food?.name}</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex quibusdam cupiditate exercitationem expedita necessitatibus sunt autem laborum harum mollitia illo.</p>
          <h1 className="text-4xl font-bold">
                  ${price}
                </h1>
                <div className="btn-group m-5">
                    <h1 className="text-2xl ">Qunatity: </h1>
                 <button className="btn btn-primary" onClick={decrementCount}>
                    -
                  </button>
                  <button className="btn btn-primary">{counter}</button>
                  <button className="btn-primary btn" onClick={incrementCount}>
                    +
                  </button>
                  
                </div><br />
                <label
           onClick={() => setCounter(1)}
            htmlFor="dinner-modal"
            className="btn btn-neutral rounded-full ... mr-2"
          >
            Close
          </label>
                <button onClick={handleAddToCart} className="btn btn-primary rounded-full ...">Add To Cart</button>
          
        </div>
        
        
      </div>
    </div>
        </div>
      </div>
    </>
  );
};

export default DinnerModal;
