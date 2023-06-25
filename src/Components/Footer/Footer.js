import React from 'react';

const Footer = () => {
    return (
        <footer className="footer p-10 bg-black text-white">
        <div>
          <img className='w-1/4' src={require("../../red-onion/images/logo.png")} alt="red-onion-logo" />
          <p>Red onion restaurant <br/>© Copyrights 2023, All rights reserved</p>
        </div> 
        <div>
          <span className="footer-title">Services</span> 
          <a className="link link-hover">Branding</a> 
          <a className="link link-hover">Design</a> 
          <a className="link link-hover">Marketing</a> 
          <a className="link link-hover">Advertisement</a>
        </div> 
        <div>
          <span className="footer-title">Company</span> 
          <a className="link link-hover">About us</a> 
          <a className="link link-hover">Contact</a> 
          <a className="link link-hover">Jobs</a> 
          <a className="link link-hover">Press kit</a>
        </div> 
        <div>
          <span className="footer-title">Legal</span> 
          <a className="link link-hover">Terms of use</a> 
          <a className="link link-hover">Privacy policy</a> 
          <a className="link link-hover">Cookie policy</a>
        </div>
      </footer>
    );
};

export default Footer;