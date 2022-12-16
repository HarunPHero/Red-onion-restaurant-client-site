import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import auth from "../firebase.init";
import Loading from "../Shared/Loading";
import "./Header.css";

const Header = () => {
  const [user] = useAuthState(auth);
  const { data, isLoading, refetch } = useQuery(["cart"], () =>
    fetch(`https://ror-backend-msaj.onrender.com/addcart?uid=${user?.uid}`).then((res) => res.json())
  );
  const logout = () => {
    signOut(auth);
    localStorage.clear("accessToken")
  };
  if (isLoading) {
    return <Loading></Loading>;
  }
  refetch();
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <a href="/" className="btn btn-ghost normal-case text-xl">
          <img
            className="w-40"
            src={require("../../red-onion/images/logo2.png")}
            alt="red-onion-logo"
          />
        </a>
      </div>

      <div className="navbar-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
          <Link to="/cart">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">
                {data?.length || 0}
              </span>
            </div>
          </Link>
        </label>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            {!user ? (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <Link to="/signup" class="btn btn-primary rounded-full ...">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <li>
                  <h1>{user?.displayName}</h1>
                </li>
                <li>
                <Link to="/history">
                  Order history
                </Link>
                </li>
                <button
                  onClick={logout}
                  className="btn btn-primary rounded-full ..."
                >
                  Signout
                </button>
              </>
            )}
          </ul>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-yellow-50 rounded-box w-52"
          >
            {!user ? (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <Link to="/signup" class="btn btn-primary rounded-full ...">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <li>
                  <h1>{user?.displayName}</h1>
                </li>
                <li>
                <Link to="/history">
                  Order history
                </Link>
                </li>
                <button
                  onClick={logout}
                  className="btn btn-primary rounded-full ..."
                >
                  Signout
                </button>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
