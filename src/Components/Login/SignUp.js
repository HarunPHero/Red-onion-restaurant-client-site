import React from "react";
import {
  useSignInWithGoogle,
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { useForm } from "react-hook-form";
import Loading from "../Shared/Loading";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import backgroundImage from "../../red-onion/images/bannerbackground.png"
import useToken from "../hooks/useToken";
import Footer from "../Footer/Footer";


const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [createUserWithEmailAndPassword, user1, loading1, error1] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, error2] = useUpdateProfile(auth);

  const navigate = useNavigate();
  let errorMessage;
  const [token] = useToken(user || user1)
  if (error || error1 || error2) {
    errorMessage = <p>Error: {error?.message || error1?.message}</p>;
  }
  if (token) {
    navigate("/")
  }
  if (loading || loading1 || updating) {
    return <Loading></Loading>;
  }
  const onSubmit = async (data) => {
    
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
    toast("Your profile has been updated");
  
  };
  return (
    <>
      <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize:"cover" }} className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse ml-10">
        
          <div className="w-96 flex-shrink-0 w-full max-w-sm ">
            <div className="card-body">
                <img className="w-2/4 ml-16" src={require("../../red-onion/images/logo2.png")} alt="" />
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Your Name is required",
                      },
                    })}
                    placeholder="Name"
                    className="input bg-base-200"
                  />
                  {errors.name?.type === "required" && (
                    <span style={{ color: "red" }}>{errors.name?.message}</span>
                  )}
                </div>
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
                    value={"Sign up"}
                  />
                </div>
              </form>
              <h1>
                Already Have an account?{" "}
                <Link to="/login" className="text-secondary">
                  Login
                </Link>
              </h1>
              <h1 style={{ color: "red" }}>{errorMessage}</h1>

              <div className="divider">OR</div>
              <button
                onClick={() => signInWithGoogle()}
                className="btn btn-outline btn-success"
              >
                {" "}
                <img src={require("../../red-onion/images/icons/google.png")} alt="" />{" "}
                <span className="px-2">Continue with google</span>{" "}
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
      <Footer></Footer>
    </>
  );
};

export default SignUp;
