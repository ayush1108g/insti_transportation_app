import React, { useState, useEffect, createContext, useContext } from "react";
import { io } from "socket.io-client";
import { useAlert } from "./AlertContext";
import LoginContext from "./AuthContext";
import { baseBackendUrl } from "../constant";
import { scheduleNotificationHandler } from "./NotificationLocal";

const SocketContext = createContext({
  updated: false,
  socket: null,
  setSocketId: () => {},
  sendMessages: () => {},
});

export const SocketContextProvider = ({ children }) => {
  const [updated, setUpdated] = useState(false);
  const [socket, setSocket] = useState(null);
  const [appOpen, setAppOpen] = useState(true);
  const { showAlert } = useAlert();
  const loginCtx = useContext(LoginContext);

  useEffect(() => {
    if (!loginCtx.isLoggedIn) {
      return;
    }
    setAppOpen(true);
    const newSocket = io(baseBackendUrl, {
      withCredentials: true,
    });
    setSocket(newSocket);
    console.log(newSocket);

    return () => {
      // newSocket.disconnect();
      setAppOpen(false);
    };
  }, [loginCtx.isLoggedIn]);

  useEffect(() => {
    if (socket) {
      socket.on("receiveNotification", (message) => {
        console.log("message received", message);
        showAlert("success", message.message, message.title);
        setUpdated(!updated);

        if (!appOpen) {
          scheduleNotificationHandler(message.title, message.message);
        }
      });
    }
  }, [socket]);

  const sendMessages = (message) => {
    socket.emit("sendNotification", message);
  };

  const context = {
    updated,
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
