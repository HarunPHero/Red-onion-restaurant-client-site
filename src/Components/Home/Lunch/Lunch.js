import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';
import Loading from '../../Shared/Loading';
import LunchModal from './LunchModal';

const Lunch = () => {
  const [user] = useAuthState(auth)
  const [lunchModal, setLunchModal] = useState([])
    const { data: lunch, isLoading } = useQuery(["lunch"], () =>
    fetch(`https://secret-earth-55769.herokuapp.com/lunch/`).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 px-3">
      {lunch?.map((l) => (
        <div className="card bg-base-100 hover:shadow-xl">
          <figure className="px-10 pt-10">
            <img
              src={l?.img}
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{l?.name}</h2>
            <p className="text-neutral">Choose your favourite {l?.category}</p>
            <p className="text-1xl font-bold">Price : ${l?.price}</p>
            <div className="card-actions">
            {
              user ? <label onClick={()=>setLunchModal(l)} htmlFor="my-lunch-modal" className="btn modal-button btn-primary rounded-full ...">Details</label>: <button disabled className="btn rounded-full ...">Login To see details</button>
            }
            <LunchModal food={lunchModal}></LunchModal>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Lunch;