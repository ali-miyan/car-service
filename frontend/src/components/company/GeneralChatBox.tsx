import React, { useEffect, useRef, useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { IChatData } from "../../schema/component";
import { useGetChatQuery } from "../../store/slices/chatApiSlice";
import { useChatSocket } from "../../service/socketService";
import { BsSendFill } from "react-icons/bs";
import Loader from "../common/Loader";

const CompanyChat = ({
  userData,
  companyId,
  companyData,
  handleButtonClick,
}: any) => {
  console.log(userData, companyData, companyId, "companuyudd");

  const { data, isLoading } = useGetChatQuery({
    userId: userData.userId,
    companyId,
  });

  console.log(data, "company chaaat");
  const [newMessage, setNewMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<IChatData>({
    _id: "",
    user: {
      userId: "",
      username: "",
      userImg: "",
    },
    company: {
      companyId: companyId as string,
      companyName: companyData?.companyName,
      companyImg: companyData?.logo,
    },
    messages: [],
  });

  useEffect(() => {
    if (data) {
      setChatMessages(data || []);
    }
  }, [data]);

  const chatSocket = useChatSocket(companyId);

  useEffect(() => {
    if (chatSocket) {
      chatSocket.on("user_to_company", (messageData: any) => {
        setChatMessages((prevState) => ({
          ...prevState,
          messages: [
            ...prevState.messages,
            {
              sender: messageData.userId,
              content: messageData.content,
              timestamp: messageData.timestamp,
              type: "text",
            },
          ],
        }));
      });

      return () => {
        chatSocket.off("user_to_company");
      };
    }
  }, [chatSocket]);

  const handleSendMessage = () => {
    setNewMessage("");

    const messageData = {
      chatId: data._id,
      companyId,
      companyName: companyData?.companyName,
      companyImg: companyData?.logo,
      userId: data?.user.userId,
      content: newMessage,
      timestamp: Date.now(),
    };

    const newMessageObject: any = {
      sender: companyId,
      content: newMessage,
      timestamp: new Date(),
      type: "text",
    };

    setChatMessages((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, newMessageObject],
    }));

    chatSocket?.emit("company_message_sent", messageData);
  };

  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="max-w-4xl mx-auto bg-white shadow-md overflow-hidden">
          <div className="flex flex-col h-full">
            <div className="flex items-center px-4 py-2 bg-white border-b border-gray-200">
              <span className="pr-4" onClick={handleButtonClick}>
                <IoArrowBackCircleOutline className="text-3xl text-black" />
              </span>

              <img
                src={data?.user?.userImg}
                alt={`${data?.user?.username} logo`}
                className="w-16 h-16 object-cover rounded-full border border-gray-300"
              />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {data?.user?.username}
                </h3>
                <p className="text-sm text-gray-500 mt-1">online</p>
              </div>
            </div>

            <div className="flex-1 min-h-[calc(88vh-150px)] max-h-[calc(80vh-100px)] p-4 border-t border-gray-200 overflow-y-auto no-scrollbar">
              {chatMessages?.messages?.length > 0 ? (
                chatMessages?.messages?.map((msg, index) => (
                  <React.Fragment key={index}>
                    <div
                      className={`flex items-start gap-1 justify-${
                        msg.sender === companyId ? "end" : "start"
                      } mb-4`}
                    >
                      {msg.sender !== companyId && (
                        <img
                          src={data?.user?.userImg || "/default-user.png"}
                          alt="User"
                          className="w-8 h-8 rounded-full border self-end border-gray-300"
                        />
                      )}
                      <div
                        className={`flex flex-col w-full max-w-[240px] px-4 py-2 border ${
                          msg.sender === companyId
                            ? "company-bg border-gray-400 rounded-l-xl rounded-t-xl"
                            : "user-bg border-gray-400 rounded-r-xl rounded-t-xl"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-sm uppercase font-bai-bold text-black`}
                          >
                            {msg.sender === companyId
                              ? data?.company?.companyName ||
                                companyData.companyName
                              : data?.user?.username}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-sm w-full font-normal pt-1 text-gray-900 break-words overflow-hidden">
                            {msg.content}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0 self-end">
                          {new Intl.DateTimeFormat("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          }).format(new Date(msg.timestamp))}
                        </span>
                      </div>
                      {msg.sender === companyId && (
                        <img
                          src={data?.company?.companyImg || companyData.logo}
                          alt="Company"
                          className="w-8 h-8 rounded-full border self-end border-gray-300"
                        />
                      )}
                    </div>
                    <div ref={endOfMessagesRef} />
                  </React.Fragment>
                ))
              ) : (
                <p className="text-center text-gray-500">No messages yet.</p>
              )}
            </div>

            <div className="flex items-center border-t border-gray-200 p-2 bg-white">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 border text-black border-gray-300 shadow-sm rounded-md"
              />
              <button
                onClick={handleSendMessage}
                className="ml-2 p-2 text-white transition-colors bg-[#ab0000] hover:bg-[#900000] rounded-md"
              >
                <BsSendFill size={25} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CompanyChat;
