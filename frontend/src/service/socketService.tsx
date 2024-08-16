import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_BOOKING_URL = "http://localhost:3003";
const SOCKET_USER_URL = "http://localhost:3000";
const SOCKET_CHAT_URL = "http://localhost:3004";

const useBookingSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io(SOCKET_BOOKING_URL, {
      withCredentials: true,
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return socket;
};
const useUserSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io(SOCKET_USER_URL, {
      withCredentials: true,
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return socket;
};
const useChatSocket = (selectedCompany: null | string) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (selectedCompany) {
      const socketInstance = io(SOCKET_CHAT_URL, {
        withCredentials: true,
      });

      setSocket(socketInstance);

      return () => {
        socketInstance.disconnect();
      };
    } else {
      setSocket(null);
    }
  }, [selectedCompany]);

  return socket;
};

export { useUserSocket, useBookingSocket, useChatSocket };
