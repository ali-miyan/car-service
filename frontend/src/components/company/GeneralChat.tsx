import React, { useEffect } from "react";
import CompanyChat from "./GeneralChatBox";
import { useGetCompanyChatQuery } from "../../store/slices/chatApiSlice";
import Loader from "../common/Loader";
import { useChatSocket } from "../../service/socketService";

const GeneralChat = ({
  selectedUser,
  id,
  companyData,
  setSelectedUser,
}: any) => {
  const { data: users, isLoading, refetch } = useGetCompanyChatQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  const chatSocket = useChatSocket(id);

  useEffect(() => {
    if (chatSocket) {
      chatSocket.on("user_to_company", () => {
        refetch()
      });

      return () => {
        chatSocket.off("user_to_company");
      };
    }
  }, [chatSocket]);

  console.log(users,'sd');
  
  return (
    <div className="pt-5 mx-auto">
      {selectedUser ? (
        <CompanyChat
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
                      key={user?.user.userId}
                      className="flex items-center p-4 hover:bg-gray-100 cursor-pointer transition duration-200 ease-in-out"
                      onClick={() => setSelectedUser(user.user)}
                    >
                      <div className="flex-shrink-0 mr-4">
                        <img
                          src={user?.user.userImg || selectedUser?.profileImg}
                          alt={`${user?.user.userImg} logo`}
                          className="w-14 h-14 object-cover rounded-full"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-lg font-medium text-gray-900">
                          {user?.user.username || selectedUser?.username}
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
};

export default GeneralChat;
