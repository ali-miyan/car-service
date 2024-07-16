import React, { useState } from "react";

const PackageContent = ({ subservices,onClose,handleSubServicesSubmit }: { subservices: any, onClose:any ,handleSubServicesSubmit:any }) => {
    const [checkedItems, setCheckedItems] = useState([]);

    const handleCheckboxChange = (event:any, id:any) => {
      const isChecked = event.target.checked;
      setCheckedItems((prevState:any) =>
        isChecked ? [...prevState, id] : prevState.filter((item:any) => item !== id)
      );
    };
  
    const handleSubmit = () => {
      console.log('Checked items:', checkedItems);
      handleSubServicesSubmit(checkedItems)
      onClose()

    };
  
    return (
        <>
      <div className="w-full max-h-80 font-bai-regular lowercase overflow-y-auto p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-center mb-4">Select Subservices</h2>
        <div className="space-y-2">
          {subservices.map((service:any) => (
            <div key={service._id} className="flex items-center">
              <input
                type="checkbox"
                id={`service-${service.id}`}
                onChange={(e) => handleCheckboxChange(e, service._id)}
                className="mr-2 cursor-pointer"
              />
              <label htmlFor={`service-${service._id}`} className="text-sm">{service.name}</label>
            </div>
          ))}
        </div>
      </div>
        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-red-800 text-white py-2 rounded hover:bg-red-900"
        >
          Submit
        </button>
      </>
    );
};

export default PackageContent;
