import { ReactNode, useState, useMemo, useCallback } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { MdBook, MdConstruction, MdDashboard, MdLogout } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetCompanyByIdQuery } from "../../store/slices/companyApiSlice";
import { getInitialToken } from "../../helpers/getToken";
import { Post } from "../../schema/company";
import DeleteConfirmationModal from "../common/ConfirmationModal";

const Sidebar = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  const navigate = useNavigate();

  const id = useMemo(() => getInitialToken("companyToken"), []);

  const {
    data: posts,
    isLoading,
    refetch,
    error,
  } = useGetCompanyByIdQuery(id as string, {
    refetchOnMountOrArgChange: false,
  });
  const companyData: Post = posts;

  const links = useMemo(
    () => [
      {
        to: "/company/home",
        icon: <MdDashboard className="text-2xl" />,
        label: "Dashboard",
      },
      {
        to: "/company/services",
        icon: <MdConstruction className="text-2xl" />,
        label: "Services",
      },
      {
        to: "/company/notification",
        icon: <MdBook className="text-2xl" />,
        label: "Notification",
      },
      {
        to: "/company/logout",
        icon: <MdLogout className="text-2xl" />,
        label: "Log-out",
      },
    ],
    []
  );

  const handleLogout = useCallback(() => {
    document.cookie =
      "companyToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/company/login");
  }, [navigate]);

  return (
    <>
      <div className="flex font-bai-regular uppercase">
        <div
          className={`${
            open ? "w-72" : "w-20"
          } bg-white h-screen p-5 pt-6 relative duration-300`}
        >
          <FaLongArrowAltLeft
            className={`absolute cursor-pointer text-1xl bg-white -right-3 top-9 w-7 h-5 border-2 border-dark-purple rounded-full ${
              !open && "rotate-180"
            }`}
            onClick={() => setOpen(!open)}
          />
          <div className="flex gap-x-4 items-center justify-around">
            <img
              src={companyData?.logo}
              className={`cursor-pointer rounded-full w-14 duration-500 text-black text-3xl ${
                open && "rotate-[360deg]"
              }`}
            />
            <h4
              className={`text-black origin-left font-bai-bold mr-12 duration-200 ${
                !open && "scale-0"
              }`}
            >
              {companyData?.companyName}
            </h4>
          </div>
          <hr className="h-px my-5 bg-gray-300 border-0"></hr>
          <ul className=" mt-2">
            {links.map((link, index) => (
              <li
                key={index}
                className={`rounded-md p-3 cursor-pointer hover:bg-red-100 text-black ${
                  isActive(link.to) ? "bg-red-100" : ""
                } text-sm items-center gap-x-4 mt-4`}
              >
                {link.to === "/company/logout" ? (
                  <DeleteConfirmationModal
                    body="Are you sure you want to logout?"
                    onConfirm={handleLogout}
                  >
                    <a className="flex items-center gap-x-2">
                      {link.icon}
                      <span
                        className={`${
                          !open && "hidden"
                        } origin-left duration-200`}
                      >
                        {link.label}
                      </span>
                    </a>
                  </DeleteConfirmationModal>
                ) : (
                  <Link to={link.to} className="flex items-center gap-x-2">
                    {link.icon}
                    <span
                      className={`${
                        !open && "hidden"
                      } origin-left duration-200`}
                    >
                      {link.label}
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
        {children}
      </div>
    </>
  );
};

export default Sidebar;
