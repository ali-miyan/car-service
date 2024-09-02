import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_BOOKING_URL = "http://localhost/api/order";
const SOCKET_USER_URL = "http://localhost/api/user";
const SOCKET_CHAT_URL = "http://localhost/api/chat";

const useBookingSocket = (id: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (id) {
      const socketInstance = io(SOCKET_BOOKING_URL, {
        withCredentials: true,
      });

      setSocket(socketInstance);

      return () => {
        socketInstance.disconnect();
      };
    } else {
      setSocket(null);
    }
  }, [id]);

  return socket;
};
const useUserSocket = (id: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (id) {
      const socketInstance = io(SOCKET_USER_URL, {
        withCredentials: true,
      });

      setSocket(socketInstance);

      return () => {
        socketInstance.disconnect();
      };
    } else {
      setSocket(null);
    }
  }, [id]);

  return socket;
};
const useChatSocket = (selectedCompany: null | string) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (selectedCompany) {
      const socketInstance = io(SOCKET_CHAT_URL, {
        withCredentials: true,  
      });

      socketInstance.on('connect', () => {
        console.log('Connected to chat server');
      });

      socketInstance.on('connect_error', (err) => {
        console.error('Connection error:', err);
      });

      socketInstance.on('disconnect', () => {
        console.log('Disconnected from chat server');
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
