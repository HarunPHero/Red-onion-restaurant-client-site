import React from 'react';
import Banner from './Banner/Banner';
import Foods from './All_Foods/Foods';
import Why from './Why_(Finishing)/Why';
import Footer from '../Footer/Footer';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Foods/>
            <Why></Why>
            <Footer></Footer>
        </div>
    );
};

export default Home;