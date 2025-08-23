import React from 'react';
import { Link } from 'react-router-dom';
export default function About() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">About Abushe Real Estate</h1>

      <p className="text-lg text-gray-700">
        Abushe Real Estate is Ethiopia’s trusted platform for buying, selling, and renting properties. 
        Whether you are searching for a modern city apartment, a family home in a serene neighborhood, 
        or land for investment, we connect you with verified listings and provide guidance every step of the way. 
        Our mission is to make property transactions smooth, transparent, and accessible to everyone.
      </p>

      <p className="text-lg text-gray-700">
        We specialize in rental services, helping tenants find housing options that perfectly fit their budget and lifestyle. 
        From short-term rentals for students to long-term leases for families and professionals, our extensive portfolio 
        ensures that everyone finds their ideal home across Ethiopia’s diverse cities. With a focus on satisfaction, 
        we make renting stress-free and convenient.
      </p>

      <p className="text-lg text-gray-700">
        Beyond sales and rentals, Abushe Real Estate offers exclusive property opportunities tailored to your needs. 
        Our experienced team assists investors in discovering profitable opportunities in Ethiopia’s growing real estate market. 
        By combining advanced technology with local expertise, we ensure that every client finds the right property at the right price.
      </p>

      <p className="text-lg text-gray-700">
        <strong>Our Values:</strong> Integrity, transparency, and customer satisfaction guide everything we do. 
        We are committed to building long-term relationships and providing exceptional service to our clients.
      </p>

      <p className="text-lg text-gray-700">
        <strong>Our Vision:</strong> To become Ethiopia’s leading real estate platform, transforming the way people buy, sell, 
        and rent properties while making real estate accessible and trustworthy for everyone.
      </p>

      <p className="text-lg text-gray-700">
        Ready to find your dream property or investment opportunity? <span className="text-blue-600 font-semibold cursor-pointer"> <Link to="/contact">Contact us today</Link></span> and let Abushe Real Estate guide you home.
      </p>
    </div>
  );
}
