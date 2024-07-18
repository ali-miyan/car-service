import { useEffect, useState } from "react";
import {
  useGetCompaniesQuery,
  useUpdateCompanyMutation,
} from "../../store/slices/companyApiSlice";
import { Link, useLocation } from "react-router-dom";
import { Post } from "../../schema/company";
import { notifyError, notifySuccess } from "../common/Toast";
import { errMessage } from "../../constants/errorMessage";

const Notification = () => {
  const location = useLocation();
  const { data: posts, isLoading, refetch } = useGetCompaniesQuery({});
  const [updateCompany] = useUpdateCompanyMutation({});
  const [toggleStates, setToggleStates] = useState<{ [key: string]: boolean }>(
    {}
  );  
  useEffect(() => {
    if (posts) {
      const initialToggleStates = posts.reduce((acc: any, post: any) => {
        acc[post._id] = post.isBlocked;
        return acc;
      }, {});
      setToggleStates(initialToggleStates);
    }
  }, [posts]);

  useEffect(() => {
    if (location.state?.refetch) {
      refetch();
    }
  }, [location.state, refetch]);


  const handleToggle = async (id: string, currentStatus: boolean) => {
    try {
      const updatedStatus = !currentStatus;
      const res = await updateCompany({ id, isBlocked: updatedStatus }).unwrap();
      if (res.success) {
        setToggleStates((prevState) => ({ ...prevState, [id]: updatedStatus }));
        notifySuccess("Status updated successfully");
        await refetch();
      } else {
        notifyError(errMessage);
      }
    } catch (error) {
      notifyError(errMessage);
      console.error("Failed to update the service status:", error);
    }
  };

  return (
    <div style={{ height: "100%" }} className="container font-bai-regular lowercase mx-auto p-4">
    ,
    ,
      <div className="overflow-x-auto min-h-screen">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">NO.</th>
              <th className="py-2 px-4 border-b">LOGO</th>
              <th className="py-2 px-4 border-b">COMPANY NAME</th>
              <th className="py-2 px-4 border-b">OWNER</th>
              <th className="py-2 px-4 border-b">STATUS</th>
              <th className="py-2 px-4 border-b">ISACTIVE</th>
              <th className="py-2 px-4 border-b">VIEW</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="py-6">
                  <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                </td>
              </tr>
            ) : posts && posts.length > 0 ? (
              posts.map((post: Post, index: number) => (
                <tr className="bg-white" key={post._id}>
                  <td className="py-2 px-4 border-b text-center">
                    {index + 1}.
                  </td>
                  <td className="py-10 px-4 border-b justify-center flex">
                    <img
                      src={post.logo}
                      className="w-20 h-16 object-cover"
                      alt="loading..."
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {post.companyName}
                  </td>
                  <td className="py-2 px-4 w-1/6 border-b text-center">
                    {post.ownerName}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <span
                      className={`${
                        post.isApproved === "accepted"
                          ? "bg-green-100 text-green-900"
                          : post.isApproved === "declined"
                          ? "bg-red-100 text-red-900"
                          : "bg-yellow-100 text-yellow-800"
                      } p-2 text-sm rounded`}
                    >
                      {post.isApproved}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <span
                      className={`inline-block px-2 pt-2 pb-1 rounded ${
                        !toggleStates[post._id]
                          ? "bg-green-100 text-green-900"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          value=""
                          className="sr-only peer"
                          checked={!toggleStates[post._id]}
                          onChange={() =>
                            handleToggle(post._id, toggleStates[post._id])
                          }
                        />
                        <div className="relative w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gray-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                          {toggleStates[post._id] ? "off" : "on"}
                        </span>
                      </label>
                    </span>
                  </td>
                  <td className="border-b text-center cursor-pointer hover:underline"><Link to={`/admin/detail-page/${post._id}`}>view</Link></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-4 text-center">
                  <p>No Notifcations.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notification;
