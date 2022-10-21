import React from "react";
import Banner from "./Banner/Banner";
import Foods from "./All_Foods/Foods";
import Why from "./Why_(Finishing)/Why";
import Footer from "../Footer/Footer";
import background from "../../red-onion/images/bannerbackground.png"

const Home = () => {
  return (
    <div>
      {/* */}
      <div
      className="min-h-screen hero"
        style={{
          backgroundImage: `url(${background})`,
         
        }}
      >
        <Banner></Banner>
      </div>
      <Foods />
      <Why></Why>
      <Footer></Footer>
    </div>
  );
};

export default Home;
