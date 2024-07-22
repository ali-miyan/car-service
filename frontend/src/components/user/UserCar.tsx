import React, { useState } from 'react';  
import CarBrandsModal from './CarBrandsModal';  
import { CarBrands } from './CarDetails';  

const UserCar = () => {  
  const [isModalOpen, setIsModalOpen] = useState(false);  

  const handleAddCarClick = () => {  
    setIsModalOpen(true);  
  };  

  const handleCloseModal = () => {  
    setIsModalOpen(false);  
  };  

  return (  
    <div className="flex flex-col items-center bg-gray-100 p-6 md:p-12">  
      <h1 className="text-2xl font-bold mb-4">MY CAR</h1>  
      <img src="../../../public/assets/download__1_-removebg-preview.png" alt="Car" className="w-full max-w-md mb-4" />  
      
      <div className="bg-white p-6 shadow-md rounded-md w-full max-w-lg mb-4">  
        <h2 className="text-xl font-semibold mb-2">About My Car</h2>  
        <ul className="list-disc list-inside space-y-1">  
          <li>Model Name: Suzuki Swift</li>  
          <li>Engine Type: 1.2L Dualjet Petrol</li>  
          <li>Power Output: 82 bhp @ 6000 rpm</li>  
          <li>Transmission: 5-speed manual / 5-speed AMT</li>  
          <li>Fuel Efficiency: Up to 23.2 km/l</li>  
          <li>Seating Capacity: 5</li>  
          <li>Infotainment System: 7-inch touchscreen with Apple CarPlay and Android Auto</li>  
          <li>Safety Features: Dual front airbags, ABS with EBD, rear parking sensors</li>  
          <li>Exterior Highlights: LED projector headlights with DRLs, 15-inch alloy wheels</li>    
          <li>Price Range: Starts from $14,000</li>  
        </ul>  
      </div>  

      <button onClick={handleAddCarClick} className="bg-red-500 text-white py-2 px-4 rounded-md flex items-center space-x-2">  
        <span>ADD CAR</span>  
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">  
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />  
        </svg>  
      </button>  

      <CarBrandsModal isOpen={isModalOpen} onClose={handleCloseModal} />  
    </div>  
  );  
};  

export default UserCar;