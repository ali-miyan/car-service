import React from "react";
import { useGetBookedUsersQuery } from "../../store/slices/chatApiSlice";
import BookedCustomerChat from "./BookedCustomerChatBox";
import Loader from "../common/Loader";

function BookerCustomerChat({
  selectedUser,
  id,
  companyData,
  setSelectedUser,
}: any) {
  const { data: users, isLoading } = useGetBookedUsersQuery(id);

  console.log(users, "data");
  return (
    <div className="pt-5 mx-auto">
      {selectedUser ? (
        <BookedCustomerChat
          userData={selectedUser}
          companyId={id}
          companyData={companyData}
          handleButtonClick={() => setSelectedUser(null)}
        />
      ) : (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full p-2 border text-black border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <ul className="divide-y divide-gray-200 mt-4">
                {users && users?.length > 0 ? (
                  users?.map((user) => (
                    <li
                      key={user?.userId}
                      className="flex items-center p-4 hover:bg-gray-100 cursor-pointer transition duration-200 ease-in-out"
                      onClick={() => setSelectedUser(user)}
                    >
                      <div className="flex-shrink-0 mr-4">
                        <img
                          src={user?.userImg}
                          alt={`${user?.userImg} logo`}
                          className="w-14 h-14 object-cover rounded-full"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-lg font-medium text-gray-900">
                          {user?.username}
                        </h3>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-center text-gray-500 mt-4">No messages</p>
                )}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default BookerCustomerChat;
