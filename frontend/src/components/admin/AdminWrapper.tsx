import React, { useState, useEffect, ReactNode } from 'react';
import { MdDashboard, MdBook, MdNotifications, MdLogout, MdConstruction, MdSupervisedUserCircle } from 'react-icons/md';
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
    <div className="flex min-h-screen h-screen lowercase font-bai-regular">
      <div className={`bg-gray-100 p-4 transition-width duration-300 
        ${isSidebarOpen ? 'w-64' : 'w-20'} ${isMobile ? 'fixed z-20' : 'relative'} h-full`}>
        <div className="flex items-center justify-between">
          {isSidebarOpen && <span className="text-lg font-bold font-bai-bold uppercase">MINI COOPER</span>}
          <GiHamburgerMenu
            className="text-2xl cursor-pointer"
            onClick={!isMobile  ? toggleSidebar : ()=>{}}
            />
        </div>
        <hr className="my-4" />
        <div className="mt-9">
          <Link to={'/admin/home'}>
            <div className={`flex items-center gap-4 p-3 hover:bg-red-100 rounded-md cursor-pointer mb-3
              ${isActive('/admin/home') ? 'bg-red-100' : ''}`}>
              <MdDashboard className="text-2xl" />
              {isSidebarOpen && <span className=" md:inline">Dashboard</span>}
            </div>
          </Link>
          <Link to={'/admin/users'}>
            <div className={`flex items-center gap-4 p-3 hover:bg-red-100 rounded-md cursor-pointer mb-3
              ${isActive('/admin/users') ? 'bg-red-100' : ''}`}>
              <MdSupervisedUserCircle className="text-2xl" />
              {isSidebarOpen && <span className=" md:inline">Users</span>}
            </div>
          </Link>
          <Link to={'/admin/services'}>
            <div className={`flex items-center gap-4 p-3 hover:bg-red-100 rounded-md cursor-pointer mb-3
              ${isActive('/admin/services') ? 'bg-red-100' : ''}`}>
              <MdConstruction className="text-2xl" />
              {isSidebarOpen && <span className=" md:inline">Services</span>}
            </div>
          </Link>
          <Link to={'/admin/notification'}>
            <div className={`flex items-center gap-4 p-3 hover:bg-red-100 rounded-md cursor-pointer mb-3
              ${isActive('/admin/notification') ? 'bg-red-100' : ''}`}>
              <MdBook className="text-2xl" />
              {isSidebarOpen && <span className=" md:inline">notification</span>}
            </div>
          </Link>
          <Link to={'/admin/notifications'}>
            <div className={`flex items-center gap-4 p-3 hover:bg-red-100 rounded-md cursor-pointer mb-3
              ${isActive('/admin/notifications') ? 'bg-red-100' : ''}`}>
              <MdNotifications className="text-2xl" />
              {isSidebarOpen && <span className=" md:inline">Notifications</span>}
            </div>
          </Link>
          <Link to={'/admin/logout'}>
            <div className={`flex items-center gap-4 p-3 hover:bg-red-100 rounded-md cursor-pointer mb-3
              ${isActive('/admin/logout') ? 'bg-red-100' : ''}`}>
              <MdLogout className="text-2xl" />
              {isSidebarOpen && <span className=" md:inline">Log-out</span>}
            </div>
          </Link>
        </div>
      </div>

      <div className={`flex-1 h-screen pt-5 bg-gray-300 px-5 ${isSidebarOpen && isMobile ? 'ml-64' : ''}`}>
        <div className="flex justify-between items-center">
          <div></div>
          <div className="w-full bg-gray-100 " />
        </div>
        <div className="bg-white w-full h-full flex justify-center rounded-md shadow-md overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
