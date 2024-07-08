import React, { useState, useEffect } from 'react';
import { MdDashboard, MdSettings, MdBook, MdNotifications, MdLogout } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <div className={`bg-gray-100 p-4 transition-width duration-300 
        ${isSidebarOpen ? 'w-64 md:w-64 sm:w-48 xs:w-20' : 'w-20 md:w-20 sm:w-20 xs:w-20 h-full'}`}>
        <div className="flex items-center justify-between">
          {isSidebarOpen && <span className="text-lg font-bold">COMPANY Name</span>}
          {!isMobile && (
            <GiHamburgerMenu
              className="text-2xl cursor-pointer"
              onClick={toggleSidebar}
            />
          )}
        </div>
        <div className="mt-8">
          <div className="flex items-center gap-4 p-2 hover:bg-gray-200 rounded-md cursor-pointer">
            <MdDashboard className="text-2xl" />
            {isSidebarOpen && <span className="hidden md:inline">Dashboard</span>}
          </div>
          <div className="flex items-center gap-4 p-2 hover:bg-gray-200 rounded-md cursor-pointer">
            <MdSettings className="text-2xl" />
            {isSidebarOpen && <span className="hidden md:inline">Settings</span>}
          </div>
          <div className="flex items-center gap-4 p-2 hover:bg-gray-200 rounded-md cursor-pointer">
            <MdBook className="text-2xl" />
            {isSidebarOpen && <span className="hidden md:inline">Documentation</span>}
          </div>
          <div className="flex items-center gap-4 p-2 hover:bg-gray-200 rounded-md cursor-pointer">
            <MdNotifications className="text-2xl" />
            {isSidebarOpen && <span className="hidden md:inline">Notifications</span>}
          </div>
          <div className="flex items-center gap-4 p-2 hover:bg-gray-200 rounded-md cursor-pointer">
            <MdLogout className="text-2xl" />
            {isSidebarOpen && <span className="hidden md:inline">Log-out</span>}
          </div>
        </div>
      </div>

      <div className="flex-1 bg-gray-200 p-4">
        <div className="flex justify-between items-center">
          <div></div>
          <div className="w-full bg-gray-100 h-24" />
        </div>
        <div className="mt-8 bg-white h-full rounded-md shadow-md">
          {/* Content of the main area */}
          <h1>jfldkassssss</h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
