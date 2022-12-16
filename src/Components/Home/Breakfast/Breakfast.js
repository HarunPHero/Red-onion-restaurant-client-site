import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import auth from "../../firebase.init";
import RequiredAuth from "../../Login/RequiredAuth";
import Loading from "../../Shared/Loading";
import BreakfastModal from "./BreakfastModal";


const Breakfast = () => {
  const [user, loading] = useAuthState(auth);
  const [breakfastModal, setBreakfastModal] = useState([])
  const { data: breakfast, isLoading } = useQuery(["breakfast"], () =>
    fetch(`https://ror-backend-msaj.onrender.com/breakfast/`).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 px-3">
      {breakfast?.map((b) => (
        <div className="card bg-base-100 hover:shadow-xl">
          <figure className="px-10 pt-10">
            <img
              src={b?.img}
              alt="Shoes"
              className="rounded-xl w-52"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{b?.name}</h2>
            <p className="text-neutral">Choose your favourite {b?.category}</p>
            <p className="text-1xl font-bold">Price : ${b?.price}</p>
            <div className="card-actions">
            {
              user ? <label onClick={()=>setBreakfastModal(b)} htmlFor="my-breakfast-modal" className="btn modal-button btn-primary rounded-full ...">Details</label>: <button disabled className="btn rounded-full ...">Login To see details</button>
            }
            <BreakfastModal food={breakfastModal}></BreakfastModal>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Breakfast;
