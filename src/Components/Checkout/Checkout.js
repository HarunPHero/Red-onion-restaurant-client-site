import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../firebase.init";
import Mapboxgl from "./Mapboxgl";

const stripePromise = loadStripe(
  "pk_test_51LnP9rIqoIiB8lodbIKLgD904mh6DPuymiNEyAJsANHEE6p402Koei46NrQO1tNJnmkUeGSGHQOPk9k10MVRZkcZ00gX0f6yFI"
);

const Checkout = () => {
  //current time + 20 minutes
  let now = new Date();
  let twentyminutesLater = new Date(now.getTime() + 20 * 60000);
  let setTML = twentyminutesLater.getHours() + ":" + twentyminutesLater.getMinutes();
  //proceed
  const [cart, setCart] = useState([]);
  const [user] = useAuthState(auth);
  const [totalPrice, setTotalPrice] = useState(0);
  const tax = parseFloat(totalPrice * 0.05).toFixed(2); //string
  const numberTax = parseFloat(tax); //number;
  const grandTotal = parseFloat(totalPrice + numberTax + 2.0).toFixed(2); //string;
  const numgt = parseFloat(grandTotal);

  useEffect(() => {
    fetch(`https://ror-backend-msaj.onrender.com/addcart?uid=${user?.uid}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);
  useEffect(() => {
    const result = cart?.reduce((a, v) => (a = a + parseFloat(v?.Price)), 0);
    const total = parseFloat(result).toFixed(2);
    const t = parseFloat(total);

    setTotalPrice(t);
  }, [cart]);
  ///details form
  const [inserted, setInserted] = useState();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    fetch(`https://ror-backend-msaj.onrender.com/deliverydetails`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => setInserted(data));
  };
  ///////////////////////////////////////////
  //checkout process
  const steps = ["Your Orders", "Address Details", "Payment"];
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const navigate = useNavigate();

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleCancel = () => {
    navigate("/cart");
  };
  //////////////////////////////////////////////////
  //pro

  //payment

  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [err, setErr] = useState("");
    const name = cart[0]?.customer;
    const email = cart[0]?.email;

    const price = numgt;
    const [clientSecret, setClientSecret] = useState("");
    const [transitionId, setTransitionId] = useState("");
    useEffect(() => {
      fetch("https://ror-backend-msaj.onrender.com/create-payment-intent", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ price }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.clientSecret) {
            setClientSecret(data.clientSecret);
          }
        });
    }, [price]);

    const Submit = async (event) => {
      event.preventDefault();

      if (!stripe || !elements) {
        return;
      }

      const card = elements.getElement(CardElement);

      if (card == null) {
        return;
      }

      // Use your card Element with other Stripe.js APIs
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        setErr(error.message);
      } else {
        setErr("");
      }
      const { paymentIntent, error: intentErr } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: name,
              email: email,
            },
          },
        });
      if (intentErr) {
        setErr(intentErr?.message);
      } else {
        setErr("");
        setTransitionId(paymentIntent.id);
        toast.success("Congratulation!! Payment successfull");
        fetch(`https://ror-backend-msaj.onrender.com/addcart`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((res) => res.json())
         
      }
    };
    return (
      <form onSubmit={Submit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <h1 className="text-center text-red-400 mt-2">{err}</h1>
        <div className="form-control mt-6">
          <input
            type="submit"
            value={`Pay Now`}
            className="btn btn-primary rounded-full ..."
          />
        </div>
        {transitionId ? (
          <div className="form-control mt-6">
            <button
              onClick={handleNext}
              className="btn btn-primary rounded-full ..."
            >
              Next
            </button>
          </div>
        ) : (
          ""
        )}
      </form>
    );
  };
 
const handleGoHome = () => {
navigate("/")
}
  /////////////////////////////////////////////////
  return (
<>
{
  cart?.length > 0 ?     <div className="m-10">
  <Box sx={{ width: "100%" }}>
    <Stepper activeStep={activeStep}>
      {steps.map((label, index) => {
        const stepProps = {};
        const labelProps = {};

        return (
          <Step key={label} {...stepProps}>
            <StepLabel {...labelProps}>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
    {activeStep === 0 ? (
      <React.Fragment>
        <Typography sx={{ mt: 2, mb: 1 }}>
          <div className="flex flex-col ... lg:flex-row ...">
            <div>
              {cart.map((c) => (
                <div className="mt-5 flex ... bg-base-200 max-w-sm p-2 rounded ...">
                  <img className="w-20 mr-5" src={c?.foodimg} alt="" />
                  <div>
                    <h1>{c?.food}</h1>
                    <h1>${c?.Price}</h1>
                    <h1 className="text-primary">included Delivery fee</h1>
                  </div>
                </div>
              ))}
            </div>
            <div className="divider lg:divider-horizontal"></div>
            <div className="text-1xl max-h-52 shadow-2xl p-10 font-bold mt-5 lg:ml-32">
              <h1>
                <span className="text-green-400">Subtotal :</span> $
                {totalPrice}
              </h1>
              <h1>
                <span className="text-neutral">Tax :</span> ${numberTax}
              </h1>
              <h1>
                <span className="text-primary">Delivery Fee :</span> ${2}.00
              </h1>
              <div className="divider"></div>
              <h1>Total : ${numgt}</h1>
            </div>
          </div>
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <button
            className="btn btn-neutral rounded-full ..."
            onClick={handleCancel}
            sx={{ mr: 1 }}
          >
            Cancel
          </button>
          <Box sx={{ flex: "1 1 auto" }} />

          <button
            className="btn btn-primary rounded-full ..."
            onClick={handleNext}
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </button>
        </Box>
      </React.Fragment>
    ) : (
      ""
    )}
    {activeStep === 1 ? (
      <React.Fragment>
        <Typography sx={{ mt: 2, mb: 1 }}>
          <>
            <div className="hero">
              <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="w-96 flex-shrink-0 w-full max-w-sm card shadow-xl">
                  <div className="card-body">
                    <img
                      className="w-2/4 ml-16"
                      src={require("../../red-onion/images/logo2.png")}
                      alt=""
                    />
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Your name</span>
                        </label>
                        <input
                          type="text"
                          {...register("name", {
                            required: {
                              value: true,
                              message: "name is required",
                            },
                          })}
                          placeholder="Your Name"
                          className="input bg-base-200"
                        />
                        {errors.name?.type === "required" && (
                          <span style={{ color: "red" }}>
                            {errors.name?.message}
                          </span>
                        )}
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Phone number</span>
                        </label>
                        <input
                          type="number"
                          {...register("phone", {
                            required: {
                              value: true,
                              message: "Phone number is requied",
                            },
                          })}
                          placeholder="Enter your phone number"
                          className="input bg-base-200"
                        />
                        {errors.phone?.type === "required" && (
                          <span style={{ color: "red" }}>
                            {errors.phone?.message}
                          </span>
                        )}
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">
                            Delivery address
                          </span>
                        </label>
                        <input
                          type="text"
                          {...register("address", {
                            required: {
                              value: true,
                              message: "Delivery addres is requied",
                            },
                          })}
                          placeholder="Enter your delivery address"
                          className="input bg-base-200"
                        />
                        {errors.address?.type === "required" && (
                          <span style={{ color: "red" }}>
                            {errors.address?.message}
                          </span>
                        )}
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">District</span>
                        </label>
                        <input
                          type="text"
                          {...register("district", {
                            required: {
                              value: true,
                              message: "Please enter a district",
                            },
                          })}
                          placeholder="Enter your disrict"
                          className="input bg-base-200"
                        />
                        {errors.district?.type === "required" && (
                          <span style={{ color: "red" }}>
                            {errors.district?.message}
                          </span>
                        )}
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Zip code</span>
                        </label>
                        <input
                          type="number"
                          {...register("zip", {
                            required: {
                              value: true,
                              message: "Zip code is requied",
                            },
                          })}
                          placeholder="Enter your area zip code"
                          className="input bg-base-200"
                        />
                        {errors.zip?.type === "required" && (
                          <span style={{ color: "red" }}>
                            {errors.zip?.message}
                          </span>
                        )}
                      </div>
                      <div className="form-control mt-6">
                        <input
                          type="submit"
                          value={"Submit"}
                          className="btn btn-primary rounded-full ..."
                        />
                      </div>
                      {inserted ? (
                        <div className="form-control mt-6">
                          <button
                            className="btn btn-primary rounded-full ..."
                            onClick={handleNext}
                          >
                            {activeStep === steps.length - 1
                              ? "Finish"
                              : "Next"}
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <button
            className="btn btn-neutral rounded-full ..."
            onClick={handleCancel}
            sx={{ mr: 1 }}
          >
            Cancel
          </button>
          <Box sx={{ flex: "1 1 auto" }} />
        </Box>
      </React.Fragment>
    ) : (
      ""
    )}

    {activeStep === 2 ? (
      <React.Fragment>
        <Typography sx={{ mt: 2, mb: 1 }}>
          <div className="card mt-10 flex-shrink-0 w-80 max-w-md shadow-2xl bg-base-100">
            <div className="card-body">
              <h2 className="card-title m-2">Payment Details</h2>
              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            </div>
          </div>
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <button
            className="btn btn-neutral rounded-full ..."
            onClick={handleCancel}
            sx={{ mr: 1 }}
          >
            Cancel
          </button>
          <Box sx={{ flex: "1 1 auto" }} />
        </Box>
      </React.Fragment>
    ) : (
      ""
    )}
    {activeStep === steps.length ? (
      <React.Fragment>
        <Typography sx={{ mt: 2, mb: 1 }}>
          <div className="lg:flex max-w-md">
            <div>
              <div
                className="pl-2"
               
              >
                <div className="card lg:mr-10  bg-base-200 shadow-xl">
                  <figure className="px-10 pt-10">
                    <img
                      src={require("../../red-onion/images/Group 1151.png")}
                      alt="Shoes"
                      className="rounded-xl w-1/4"
                    />
                  </figure>
                  <div className="bg-base-100 m-10 mt-2 p-5 rounded-lg ...">
                    <ul className="steps steps-vertical items-center text-center">
                      <li
                        data-content="2"
                        className="step step-primary text-center"
                      >
                        Your Location
                      </li>
                      <li data-content="1" className="step step-primary">
                        Shop address <br />
                        Munshipara, Dinajpur
                      </li>
                    </ul>
                  </div>
                  <h1 className="text-1xl text-white font-bold px-10 pt-5">
                   We will try to deliver your order in 20 minutes
                  </h1>
                  <h1 className="text-1xl font-bold px-10 ">
                    Estimated Delivery Time: {setTML}
                  </h1>
                  <div className="flex p-5 bg-white mx-10 my-5 rounded-lg ...">
                    <div className="image">
                      <img
                        className="w-12"
                        src={require("../../red-onion/images/Group 1152.png")}
                        alt=""
                      />
                    </div>
                    <div className="Deliman px-2">
                      <h1 className="font-bold">Sadique</h1>
                      <h1 className="text-neutral">Your raider</h1>
                    </div>
                  </div>
                  <div className="form-control mt-6 mx-10 mb-2">
                  <button onClick={handleGoHome} className="btn btn-primary">
                    Go to Home
                  </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="shadow-5xl mt-10 rounded-full ...">
              <Mapboxgl />
            </div>
          </div>
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}></Box>
      </React.Fragment>
    ) : (
      ""
    )}
  </Box>
</div> :
 <><h1 className="text-2xl text-center font-bold text-primary"> You have no cart here😴<Link className="btn btn-primary text-center rounded-full ..." to="/">Back to Home</Link></h1>
 <img className="w-3/4 " src={require("../../red-onion/images/nothing.png")} alt="" />
 </>

}
</>
  );
};

export default Checkout;
