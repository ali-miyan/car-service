import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white ">
      <img
        src={"../../../../public/assets/car-dealer-loader-gif.gif"}
        alt="Loading"
        className="w-36 h-36"
      />
    </div>
  );
};

export default Loader;
