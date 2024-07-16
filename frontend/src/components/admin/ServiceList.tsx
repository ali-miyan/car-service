import { Link, useLocation } from "react-router-dom";
import {
  useDeleteServicePostMutation,
  useGetServiceQuery,
  useUpdateServiceStatusMutation,
} from "../../store/slices/adminApiSlice";
import { Tooltip } from "@material-tailwind/react";
import { AiFillDelete } from "react-icons/ai";
import DeleteConfirmationModal from "../common/ConfirmationModal";
import { notifyError, notifySuccess } from "../common/Toast";
import { errMessage } from "../../constants/errorMessage";
import { useState, useEffect } from "react";

const ServiceTable = () => {

  const { data: posts, isLoading, refetch } = useGetServiceQuery({});
  const location = useLocation();


  const [deleteServicePost] = useDeleteServicePostMutation();
  const [updateServiceStatus] = useUpdateServiceStatusMutation();
  const [toggleStates, setToggleStates] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (location.state?.refetch) {
      refetch();
    }
  }, [location.state, refetch]);

  useEffect(() => {
    if (posts) {
      const initialToggleStates = posts.reduce((acc: any, post: any) => {
        acc[post._id] = post.isBlocked;
        return acc;
      }, {});
      setToggleStates(initialToggleStates);
    }
  }, [posts]);

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteServicePost(id).unwrap();
      
      if (res.success) {
        notifySuccess("Deleted successfully");
        await refetch();
      } else {
        notifyError(errMessage);
      }
    } catch (error) {
      notifyError(errMessage);
      console.error("Failed to delete the service:", error);
    }
  };

  const truncateDescription = (description: string, wordLimit: number) => {
    const words = description.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return description;
  };

  const handleToggle = async (id: string, currentStatus: boolean) => {
    try {
      const updatedStatus = !currentStatus;
      const res = await updateServiceStatus({ id, isBlocked: updatedStatus }).unwrap();
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
    <>
    <div style={{ height: "100%" }} className="container font-bai-regular lowercase mx-auto p-4">
      <div className="overflow-x-auto min-h-screen">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">NO.</th>
              <th className="py-2 px-4 border-b">IMAGE</th>
              <th className="py-2 px-4 border-b">SERVICE TYPE</th>
              <th className="py-2 px-4 border-b">DESCRIPTION</th>
              <th className="py-2 px-4 border-b">NO OF PACKAGES</th>
              <th className="py-2 px-4 border-b">STATUS</th>
              <th className="py-2 px-4 border-b">ACTION</th>
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
              posts.map((post: any, index: number) => (
                <tr className="bg-white" key={post._id}>
                  <td className="py-2 px-4 border-b text-center">{index + 1}.</td>
                  <td className="py-10 px-4 border-b justify-center flex">
                    <img
                      src={post.logoUrl}
                      className="w-20 h-16 object-cover"
                      alt="loading..."
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-center">{post.serviceName}</td>
                  <td className="py-2 px-4 w-1/6 border-b text-center">
                    {truncateDescription(post.description, 6)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <Tooltip
                      content={post.subServices
                        ?.map((subService: { name: unknown }) => subService.name)
                        .join(", ")}
                      className="bg-gray-800 font-bai-regular lowercase w-3/12"
                      placement="right-start"
                    >
                      <span className="p-3 bg-slate-50 cursor-pointer rounded">
                        {post.subServices?.length}
                      </span>
                    </Tooltip>
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
                          onChange={() => handleToggle(post._id, toggleStates[post._id])}
                        />
                        <div className="relative w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gray-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                          {toggleStates[post._id] ? "off" : "on"}
                        </span>
                      </label>
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <DeleteConfirmationModal
                      body="Are you sure you want to delete this item?"
                      onConfirm={() => handleDelete(post._id)}
                    >
                      <button className="bg-red-800 hover:bg-red-900 text-white p-3 rounded">
                        <AiFillDelete />
                      </button>
                    </DeleteConfirmationModal>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-4 text-center">
                  <p>No services available.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      <div className="flex justify-center mt-4">
        <Link to="/admin/add-service">
          <button className="bg-black lowercase text-white px-4 py-2 my-2 rounded">
            ADD NEW SERVICE
          </button>
        </Link>
      </div>
      </div>
    </div>
    </>
  );
};

export default ServiceTable;
