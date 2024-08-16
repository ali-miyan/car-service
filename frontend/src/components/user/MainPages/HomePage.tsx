
const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="w-full">
        <img
          src="../../../public/assets/item-1.jpg" 
          alt="Banner"
          className="w-full h-full mt-16 object-cover"
        />
      </div>
      <div className="p-4 mt-16 bg-white  max-w-md mx-auto shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center">Welcome to Our Website</h1>
        <p className="text-center mt-4">This is a simple homepage with a responsive banner image.</p>
      </div>
    </div>
  );
};

export default HomePage;
