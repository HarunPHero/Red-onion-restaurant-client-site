import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../firebase.init";
import Loading from "../Shared/Loading";

const Carts = () => {
  const [user] = useAuthState(auth);
  
  const {
    data: cart,
    isLoading,
    refetch,
  } = useQuery(["cart"], () =>
    fetch(`https://secret-earth-55769.herokuapp.com/addcart?uid=${user?.uid}`).then((res) =>
      res.json()
    )
  );
  if (isLoading) {
    return <Loading></Loading>;
  }

  refetch();
  const handleDelete = (id) => {
    const proceed = window.confirm("Are you want to delete this from cart?");
    if(proceed){
      fetch(`https://secret-earth-55769.herokuapp.com/addcart/${id}`,{
        method:'DELETE',
        headers:{
          'content-type':"application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      })
      .then(res => res.json())
      .then(deletedCart => {
        if (deletedCart.deletedCount) {
          toast.success(`Cart is deleted.`);

          refetch();
        }
      })
  
    }
  }
 
  return (
   <>
    {
      cart.length > 0 ? <><div className="grid grid-cols-1 lg:grid-cols-2 gap-5 px-3 ">
          {cart.map((c) => (
            <div>
              <div className="modal-box w-96 relative">
                <button onClick={() => handleDelete(c?._id)} className="btn btn-sm btn-circle absolute right-2 top-2">
                  ✕
                </button>
                <div className="card bg-base-100 mt-5">
                  <figure className="">
                    <img src={c?.foodimg} alt="Shoes" className="w-2/4" />
                  </figure>
                  <div className="card-body items-center text-center">
                    <h2 className="card-title">{c?.food}</h2>
                    <h2 className="card-title">Customer name: {c?.customer}</h2>
                    <h2 className="card-title">Quantity: {c?.quantity}</h2>
                    <h2 className="card-title">Price: ${c?.Price}</h2>
                    <h2 className="card-title">category: {c?.category}</h2>



                  </div>
                </div>
              </div>
            </div>
          ))}
        </div><Link to="/checkout" className="btn btn-primary rounded-full ... text-center m-10 mx-24">Proceed to checkout</Link></>:

        <><h1 className="text-2xl text-center font-bold text-primary"> You have no cart here😴<Link className="btn btn-primary text-center rounded-full ..." to="/">Back to Home</Link></h1>
        <img className="w-3/4 " src={require("../../red-onion/images/nothing.png")} alt="" />
        </>
    }
   </>
  );
};

export default Carts;
