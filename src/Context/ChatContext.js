import React, { createContext, useEffect } from "react";
import UserContoller from "../APIs/UserController";
import ChatController from "../APIs/ChatController";
import AuthContext from "./AuthContext";

const ChatContext = createContext({
  requestNotifications: [],
  acceptedNotifications: [],
  setRequestNotifications: (notifications) => {},
  acceptRequest: (id) => {},
  rejectRequest: (id) => {},
  requestsChat: [],
  messagesChat: [],
  getRequestsChat: (id) => {},
  getMessagesChat: (id) => {},
  getChats: () => {},
  markResolved: (id) => {},
});

const ChatProvider = (props) => {
  const [requestNotifications, setRequestNotifications] = React.useState([]);
  const [acceptedNotifications, setAcceptedNotifications] = React.useState([]);
  const [requestsChat, setRequestsChat] = React.useState([]);
  const [messagesChat, setMessagesChat] = React.useState([]);
  const userController = new UserContoller();
  const chatController = new ChatController();
  const authContext = React.useContext(AuthContext);

  useEffect(() => {
    if (!authContext.isLogined) {
      console.log(
        "User Not Logged In, Chat not loading...",
        authContext.isLogined
      );
      return;
    }
    getNotifications();
    getChats();
  }, [authContext.isLogined]);

  //Chats

  async function getChats() {
    const res = await chatController.getChats();
    setMessagesChat(res);
  }

  async function getNotifications() {
    console.log("Getting notifications...");
    const res = await userController.getRequestConsultation();
    setRequestNotifications(res);
    filterAcceptedNotifications();
    console.log(res);
  }

  function filterAcceptedNotifications() {
    const acceptedNotifications = requestNotifications?.filter(
      (not) => not.status === "Accepted"
    );
    setAcceptedNotifications(acceptedNotifications);
  }

  const acceptRequestHandler = async (id) => {
    const filteredNotifications = requestNotifications.map((not) => {
      return not.id === id ? { ...not, status: "Accepted" } : not;
    });
    const res = await userController.updateConsultation({
      chat_id: id,
      status: "Accepted",
    });

    setRequestNotifications(filteredNotifications);
    getNotifications();
  };

  const rejectRequestHandler = async (id) => {
    const filteredNotifications = requestNotifications.map((not) => {
      return not.id === id ? { ...not, status: "Rejected" } : not;
    });
    const res = await userController.updateConsultation({
      chat_id: id,
      status: "Rejected",
    });

    setRequestNotifications(filteredNotifications);
    getNotifications();
  };

  const setNotificationHandler = (notifications) => {};

  const intiValue = {
    requestNotifications: requestNotifications,
    acceptedNotifications: acceptedNotifications,
    setRequestNotifications: setNotificationHandler,
    acceptRequest: acceptRequestHandler,
    rejectRequest: rejectRequestHandler,
    requestsChat: requestsChat,
    messagesChat: messagesChat,
    getRequestsChat: (id) => {
      return {
        user: requestsChat.find((chat) => chat.id == id),
        messages: [],
      };
    },
    getMessagesChat: (id) => {
      return {
        user: messagesChat.find((chat) => chat.id == id),
        messages: [],
      };
    },
    getChats: getChats,
    markResolved: async (id) => {
      console.log("Marking Resolved", id);
      const response = await userController.markResolved({
        chat_id: id,
      });
      console.log("Marked Resolved", response);
      getChats();
    },
  };

  return (
    <ChatContext.Provider value={intiValue}>
      {props.children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };
