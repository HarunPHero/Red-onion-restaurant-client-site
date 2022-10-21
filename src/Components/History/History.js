import React from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { Link } from "react-router-dom";

const History = () => {
  const [user] = useAuthState(auth);
  const { data: history, isLoading } = useQuery(["history"], () =>
    fetch(
      `https://secret-earth-55769.herokuapp.com/history?uid=${user?.uid}`
    ).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <>
      {history?.length > 0 ? (
        <div>
          <h1 className="text-center text-1xl font-bold">
            User name: {user?.displayName}
          </h1>
          <h1 className="text-center text-1xl font-bold">
            User Id: {user?.uid}
          </h1>
          <h1 className="text-center text-1xl font-bold">
            You have already ordered {history?.length} items
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 px-3">
            {history?.map((h) => (
              <div className="card-body items-center text-center">
                <img className="w-52" src={h?.foodimg} alt="food-img" />
                <h2 className="card-title">{h?.food}</h2>
                <p className="text-neutral">Customer Name: {h?.customer}</p>
                <p className="text-neutral">Email: {h?.email}</p>
                <p className="text-neutral">Quantity: {h?.quantity}</p>
                <p className="text-1xl font-bold">Price : ${h?.Price}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-2xl text-center font-bold text-primary">
            {" "}
            You have no history here😴
            <Link
              className="btn btn-primary text-center rounded-full ..."
              to="/"
            >
              Continue Shopping
            </Link>
          </h1>
          <img
            className="w-3/4 "
            src={require("../../red-onion/images/nothing.png")}
            alt=""
          />
        </>
      )}
    </>
  );
};

export default History;
