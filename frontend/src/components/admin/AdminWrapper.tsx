import React, { useState, useEffect, ReactNode } from 'react';
import { MdDashboard, MdBook, MdNotifications, MdLogout,MdConstruction } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link, useLocation } from 'react-router-dom';

const Dashboard = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const location = useLocation();

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

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex min-h-screen lowercase font-bai-regular">
      <div className={`bg-gray-100 p-4 transition-width duration-300 
        ${isSidebarOpen ? 'w-64 md:w-64 sm:w-48 xs:w-20' : 'w-20 md:w-20 sm:w-20 xs:w-20 h-full'}`}>
        <div className="flex items-center justify-around">
          {isSidebarOpen && <span className="text-lg font-bold font-bai-bold uppercase">MINI COOPER</span>}
          {!isMobile && (
            <GiHamburgerMenu
              className="text-2xl cursor-pointer"
              onClick={toggleSidebar}
            />
          )}
        </div><br />
        <hr />
        <div className="mt-9">
          <Link to={'/admin/home'}>
            <div className={`flex items-center gap-4 p-3 hover:bg-red-100 rounded-md cursor-pointer mb-3
              ${isActive('/admin/home') ? 'bg-red-100' : ''}`}>
              <MdDashboard className="text-2xl" />
              {isSidebarOpen && <span className="hidden md:inline">Dashboard</span>}
            </div>
          </Link>
          <Link to={'/admin/services'}>
            <div className={`flex items-center gap-4 p-3 hover:bg-red-100 rounded-md cursor-pointer mb-3
              ${isActive('/admin/services') ? 'bg-red-100' : ''}`}>
              <MdConstruction className="text-2xl" />
              {isSidebarOpen && <span className="hidden md:inline">Services</span>}
            </div>
          </Link>
          <Link to={'/admin/documentation'}>
            <div className={`flex items-center gap-4 p-3 hover:bg-red-100 rounded-md cursor-pointer mb-3
              ${isActive('/admin/documentation') ? 'bg-red-100' : ''}`}>
              <MdBook className="text-2xl" />
              {isSidebarOpen && <span className="hidden md:inline">Documentation</span>}
            </div>
          </Link>
          <Link to={'/admin/notifications'}>
            <div className={`flex items-center gap-4 p-3 hover:bg-red-100 rounded-md cursor-pointer mb-3
              ${isActive('/admin/notifications') ? 'bg-red-100' : ''}`}>
              <MdNotifications className="text-2xl" />
              {isSidebarOpen && <span className="hidden md:inline">Notifications</span>}
            </div>
          </Link>
          <Link to={'/admin/logout'}>
            <div className={`flex items-center gap-4 p-3 hover:bg-red-100 rounded-md cursor-pointer mb-3
              ${isActive('/admin/logout') ? 'bg-red-100' : ''}`}>
              <MdLogout className="text-2xl" />
              {isSidebarOpen && <span className="hidden md:inline">Log-out</span>}
            </div>
          </Link>
        </div>
      </div>

      <div className="flex-1 h-auto pt-5 bg-gray-300 px-5">
        <div className="flex justify-between items-center">
          <div></div>
          <div className="w-full bg-gray-100 " />
        </div>
        <div className="bg-white h-full justify-center flex rounded-md shadow-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
