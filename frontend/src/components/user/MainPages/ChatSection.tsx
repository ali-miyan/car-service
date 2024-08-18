import { useRef, useEffect, useState } from "react";
import { BsSendFill } from "react-icons/bs";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useGetChatQuery } from "../../../store/slices/chatApiSlice";
import { useGetUserByIdQuery } from "../../../store/slices/userApiSlice";
import { useChatSocket } from "../../../service/socketService";
import { IChatData } from "../../../schema/component";
import Loader from "../../common/Loader";

const ChatSection = ({ selectedCompany, setSelectedCompany, token }: any) => {
  const { data: chat, isLoading } = useGetChatQuery(
    { userId: token, companyId: selectedCompany?._id },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: posts } = useGetUserByIdQuery(token as string);

  const [chatMessages, setChatMessages] = useState<IChatData>({
    _id: "",
    user: {
      userId: token,
      username: posts?.username,
      userImg: posts?.profileImg,
    },
    company: { companyId: "", companyName: "", companyImg: "" },
    messages: [],
  });
  const [newMessage, setNewMessage] = useState("");

  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chat) {
      setChatMessages(chat || []);
    }
  }, [chat]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const chatSocket = useChatSocket(selectedCompany);

  const handleSendMessage = () => {
    if (selectedCompany && newMessage.trim()) {
      setNewMessage("");

      const messageData = {
        userId: token,
        username: posts?.username,
        userImg: posts?.profileImg,
        companyId: selectedCompany._id,
        content: newMessage,
        timestamp: Date.now(),
      };

      const newMessageObject: any = {
        sender: token,
        content: newMessage,
        timestamp: new Date(),
        type: "text",
      };

      setChatMessages((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, newMessageObject],
      }));

      chatSocket?.emit("user_message_sent", messageData);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="flex items-center px-4 py-2 bg-white border-b border-gray-200">
          <span className="pr-4">
            <IoArrowBackCircleOutline
              className="text-3xl text-black"
              onClick={() => setSelectedCompany(null)}
            />
          </span>

          <img
            src={selectedCompany.logo}
            alt={`${selectedCompany.companyName} logo`}
            className="w-16 h-16 object-cover rounded-full border border-gray-300"
          />
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {selectedCompany.companyName}
            </h3>
            <p className="text-sm text-gray-500 mt-1">online</p>
          </div>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex-1 min-h-[calc(95vh-200px)] max-h-[calc(95vh-200px)] p-4 border-t border-gray-200 overflow-y-auto no-scrollbar">
            {chatMessages?.messages.length > 0 ? (
              <>
                {chatMessages?.messages?.map((msg, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-1 justify-end mb-4"
                  >
                    <div className="flex flex-col w-full max-w-[240px] px-4 py-2 border border-gray-400 bg-gray-100 rounded-l-xl rounded-tr-xl">
                      <div className="flex items-center justify-between">
                        <span className="text-sm uppercase font-bai-bold text-gray-900">
                          {chatMessages.user.username}
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
                    <img
                      src={chatMessages.user.userImg || "/default-user.png"}
                      alt="User"
                      className="w-8 h-8 rounded-full  self-end border border-gray-300"
                    />
                  </div>
                ))}
                <div ref={endOfMessagesRef} />
              </>
            ) : (
              <p className="text-center text-gray-500">No messages yet.</p>
            )}
          </div>
        )}

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
  );
};

export default ChatSection;
