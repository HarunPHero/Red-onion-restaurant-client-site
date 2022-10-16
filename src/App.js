import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Aos from "aos"
import "aos/dist/aos.css"
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import SignUp from "./Components/Login/SignUp";
import "react-toastify/dist/ReactToastify.css";
import Carts from "./Components/Cart/Carts";
import Checkout from "./Components/Checkout/Checkout";
import RequiredAuth from "./Components/Login/RequiredAuth";
import { useEffect } from "react";
import History from "./Components/History/History";
function App() {
    useEffect(()=>{
      Aos.init({duration:3000})
    },[])
  return (
    <div className="App">
      <>
      <Header></Header>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/cart" element={<RequiredAuth><Carts></Carts></RequiredAuth>}></Route>
          <Route path="/checkout" element={<RequiredAuth><Checkout></Checkout></RequiredAuth>}></Route>
          <Route path="/history" element={<RequiredAuth><History></History></RequiredAuth>}></Route>
        </Routes>

        <ToastContainer />
      </>
    </div>
  );
}

export default App;
