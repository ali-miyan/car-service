import { useGetOrdersQuery } from "../../store/slices/orderApiSlice";
import { Link } from "react-router-dom";
import { getInitialToken } from "../../helpers/getToken";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const ListBooking = () => {
  const companyId = getInitialToken("companyToken");
  const {
    data: posts,
    isLoading,
    refetch,
  } = useGetOrdersQuery(companyId as string);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.refetch) {
      refetch();
    }
  }, [location.state, refetch]);

  console.log(posts, "erererereerrorrr");

  return (
    <>
      <div
        style={{ height: "100%", width: "100%" }}
        className="container lowercase font-bai-regular mx-auto p-9"
      >
        <div className="overflow-x-auto rounded min-h-screen">
          <table className="min-w-full">
            <thead className="bg-gray-300">
              <tr>
                <th className="py-2 px-4 border-b">NO.</th>
                <th className="py-2 px-4 border-b">order id</th>
                <th className="py-2 px-4 border-b">scheduled at</th>
                <th className="py-2 px-4 border-b">service place</th>
                <th className="py-2 px-4 border-b">payment</th>
                <th className="py-2 px-4 border-b">status</th>
                <th className="py-2 px-4 border-b">view</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-6">
                    <div className="animate-pulse space-y-2">
                      <div className="h-10 bg-gray-300 rounded w-full"></div>
                      <div className="h-10 bg-gray-300 rounded w-full"></div>
                      <div className="h-10 bg-gray-300 rounded w-full"></div>
                      <div className="h-10 bg-gray-300 rounded w-full"></div>
                    </div>
                  </td>
                </tr>
              ) : posts && posts.length > 0 ? (
                posts.map((post: any, index: number) => (
                  <tr className="bg-white" key={post.id}>
                    <td className=" border-b text-center">{index + 1}.</td>
                    <td className="p-7 border-b justify-center flex">
                      #{post.id.substring(0, 6)}
                    </td>

                    <td className="p-7 border-b text-center">{post.date}</td>

                    <td className="p-7 w-1/6 border-b text-center">
                      {post.servicePlace}
                    </td>
                    <td className="p-7 text-center">{post.payment}</td>
                    <td className="p-7 text-center">
                      <span className="bg-green-100 p-2 rounded">
                        {post.status}
                      </span>
                    </td>
                    <td className="p-7 text-center ">
                      <Link to={`/company/order-details/${post.id}`}>
                        <span className="hover:underline">view</span>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-4 text-center">
                    <p>No ORDERS available.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ListBooking;
