import React, { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const logos = [
    "https://www.logo.wine/a/logo/Google/Google-Logo.wine.svg",
    "https://www.logo.wine/a/logo/Google/Google-Logo.wine.svg",
    "https://www.logo.wine/a/logo/Google/Google-Logo.wine.svg",
    "https://www.logo.wine/a/logo/Google/Google-Logo.wine.svg",
    "https://www.logo.wine/a/logo/Google/Google-Logo.wine.svg",
    "https://www.logo.wine/a/logo/Microsoft/Microsoft-Logo.wine.svg",
    "https://www.logo.wine/a/logo/Netflix/Netflix-Logo.wine.svg",
    "https://www.logo.wine/a/logo/Spotify/Spotify-Logo.wine.svg",
    "https://www.logo.wine/a/logo/Twitter/Twitter-Logo.wine.svg",
    "https://www.logo.wine/a/logo/Facebook/Facebook-Logo.wine.svg",
  ];

const LogoSlider = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const handlePrevClick = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const handleNextClick = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full py-12 max-w-4xl mx-auto overflow-hidden">
      <div
        ref={sliderRef}
        className="flex space-x-4 overflow-auto scroll-smooth"
      >
        {[...logos, ...logos].map((logo, index) => (
          <div key={index} className="flex-shrink-0 w-32 mx-2">
            <img
              src={logo}
              alt={`Logo ${index + 1}`}
              className="w-full h-auto object-contain"
            />
          </div>
        ))}
      </div>
      <button
        onClick={handlePrevClick}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10"
      >
        <FaArrowLeft className="text-gray-800" />
      </button>
      <button
        onClick={handleNextClick}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10"
      >
        <FaArrowRight className="text-gray-800" />
      </button>
      <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-1 px-4 rounded-full">
        More
      </button>
    </div>
  );
};

export default LogoSlider;
