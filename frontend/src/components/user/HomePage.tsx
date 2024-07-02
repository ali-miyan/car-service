// src/HomePage.js
import React from 'react';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="w-full">
        <img
          src="https://images.alphacoders.com/854/854152.jpg" // Replace with your banner image URL
          alt="Banner"
          className="w-full  object-cover"
        />
      </div>
      <div className="p-4 mt-16 bg-white z-50 max-w-md mx-auto shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center">Welcome to Our Website</h1>
        <p className="text-center mt-4">This is a simple homepage with a responsive banner image.</p>
      </div>
    </div>
  );
};

export default HomePage;
