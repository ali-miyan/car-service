import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_BOOKING_URL = "http://localhost:3003";
const SOCKET_uSER_URL = "http://localhost:3000";

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
    const socketInstance = io(SOCKET_uSER_URL, {
      withCredentials: true,
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return socket;
};

export {
  useUserSocket,
  useBookingSocket
};
