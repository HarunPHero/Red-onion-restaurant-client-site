import React, { useState } from "react";
import {
  useSignInWithGoogle,
  useSignInWithEmailAndPassword,
  useSendPasswordResetEmail,
} from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { useForm } from "react-hook-form";
import Loading from "../Shared/Loading.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import backgroundImage from "../../red-onion/images/bannerbackground.png";
import useToken from "../hooks/useToken";
import Footer from "../Footer/Footer";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [email, setEmail] = useState("");

  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, user1, loading1, error1] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);

  let errorMessage;
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const [token] = useToken(user || user1);
  if (token) {
    navigate("/");
  }

  if (error || error1) {
    errorMessage = <p>Error: {error?.message || error1?.message}</p>;
  }

  if (loading || loading1) {
    return <Loading></Loading>;
  }
  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
        }}
        className="hero min-h-screen"
      >
        <div className="hero-content flex-col lg:flex-row-reverse ml-10">
          <div className="w-96 flex-shrink-0 w-full max-w-sm">
            <div className="card-body">
              <img
                className="w-2/4 ml-16"
                src={require("../../red-onion/images/logo2.png")}
                alt=""
              />
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "email is required",
                      },
                      pattern: {
                        value: /[a-z0-9]+@[a-z]+.[a-z]{2,3}/,
                        message: "Invalid email",
                      },
                    })}
                    placeholder="email"
                    className="input bg-base-200"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email?.type === "required" && (
                    <span style={{ color: "red" }}>
                      {errors.email?.message}
                    </span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span style={{ color: "red" }}>
                      {errors.email?.message}
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is requied",
                      },
                      minLength: {
                        value: 6,
                        message: "must be 6 characters longer",
                      },
                    })}
                    placeholder="Enter your Password"
                    className="input bg-base-200"
                  />
                  {errors.password?.type === "required" && (
                    <span style={{ color: "red" }}>
                      {errors.password?.message}
                    </span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span style={{ color: "red" }}>
                      {errors.password?.message}
                    </span>
                  )}
                </div>
                <div className="form-control mt-6">
                  <input
                    className="btn btn-primary"
                    type="submit"
                    value={"Login"}
                  />
                </div>
              </form>
              <h1>
                New to Red onion?{" "}
                <Link to="/signUp" className="text-secondary">
                  Create an account
                </Link>
              </h1>

              <button
                onClick={() => {
                  sendPasswordResetEmail(email);
                  if (email) {
                    toast(
                      "Please check your email inbox or spam to reset password"
                    );
                  }
                  if (!email) {
                    toast("Please enter your Email address");
                  }
                }}
              >
                <h1 style={{ color: "red" }}>Forgotten Password</h1>
              </button>

              <h1 style={{ color: "red" }}>{errorMessage}</h1>

              <div className="divider">OR</div>
              <button
                onClick={() => signInWithGoogle()}
                className="btn btn-outline btn-success"
              >
                {" "}
                <img
                  src={require("../../red-onion/images/icons/google.png")}
                  alt=""
                />{" "}
                <span className="px-2">Continue with google</span>{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Login;
