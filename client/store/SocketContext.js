import React, { useState, useEffect, createContext, useContext } from "react";
import { io } from "socket.io-client";
import { useAlert } from "./AlertContext";
import LoginContext from "./AuthContext";
import { baseBackendUrl } from "../constant";

const SocketContext = createContext({
  socket: null,
  setSocketId: () => {},
});

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { showAlert } = useAlert();
  const loginCtx = useContext(LoginContext);

  useEffect(() => {
    if (!loginCtx.isLoggedIn) {
      return;
    }
    const newSocket = io(baseBackendUrl, {
      withCredentials: true,
    });
    setSocket(newSocket);
    console.log(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [loginCtx.isLoggedIn]);

  useEffect(() => {
    if (socket) {
      socket.on("receiveNotification", (message) => {
        console.log("message received", message);
        showAlert("success", message.message, message.title);
      });
    }
  }, [socket]);

  const sendMessages = (message) => {
    socket.emit("sendNotification", message);
  };

  const context = {
    socket,
    setSocketId: setSocket,
    sendMessages,
  };

  return (
    <SocketContext.Provider value={context}>{children}</SocketContext.Provider>
  );
};
const useSocket = () => {
  return useContext(SocketContext);
};

export default useSocket;
