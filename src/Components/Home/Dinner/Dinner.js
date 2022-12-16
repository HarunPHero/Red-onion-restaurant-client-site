import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import auth from "../../firebase.init";
import Loading from "../../Shared/Loading";
import DinnerModal from "./DinnerModal";

const Dinner = () => {
  const [user] = useAuthState(auth)
  const [dinnerModal, setDinnerModal] = useState([]);
  const { data: dinner, isLoading } = useQuery(["dinner"], () =>
    fetch(`https://ror-backend-msaj.onrender.com/dinner/`).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 px-3">
      {dinner?.map((d) => (
        <div  className="card bg-base-100 hover:shadow-xl">
          <figure className="px-10 pt-10">
            <img src={d?.img} alt="Shoes" className="rounded-xl w-52" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{d?.name}</h2>
            <p className="text-neutral">Choose your favourite {d?.category}</p>
            <p className="text-1xl font-bold">Price : ${d?.price}</p>
            <div className="card-actions">
            {
              user ? <label onClick={()=>setDinnerModal(d)} htmlFor="dinner-modal" className="btn modal-button btn-primary rounded-full ...">Details</label>: <button disabled className="btn rounded-full ...">Login To see details</button>
            }
            <DinnerModal food={dinnerModal}></DinnerModal>
            </div>
          </div>
        </div>
      ))}
     
    </div>
  );
};

export default Dinner;
