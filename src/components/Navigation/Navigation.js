import React, { useContext, useEffect } from "react";
import NavigationTab from "./NavigationTab";
import Divider from "../../Utils/Divider";
import AuthContext from "../../Context/AuthContext";
import { PopupContext } from "../../Context/PopupContext";
import Utils from "../../Utils/Utils";
import { useLocation } from "react-router-dom";
import ChatController from "../../APIs/ChatController";
import { ChatContext } from "../../Context/ChatContext";
import ApplyForLawerDialog from "../../Dialogs/ApplyForLawerDialog";
import PromotionDialog from "../../Dialogs/PromotionDialog";

const navigationItem = [
  {
    id: "feeds",
    name: "Home",
  },
  {
    id: "library",
    name: "Library",
  },
  {
    id: "chatbot",
    name: "Chat Bot",
  },
];

const Navigation = (props) => {
  const location = useLocation();
  let path = location.pathname.replace("/", "");
  if (path == "") {
    path = "feeds";
  }
  const chatContext = useContext(ChatContext);

  const chatController = new ChatController();

  const [isActive, setIsActive] = React.useState(path);
  const [unreadCount, setUnreadCount] = React.useState(0);
  const [unread, setUnread] = React.useState(null);
  const [userType, setUserType] = React.useState(null);
  const intervalId = React.useRef(null);

  const authContext = useContext(AuthContext);
  const popupContext = useContext(PopupContext);

  useEffect(() => {
    getUnreadCount();

    intervalId.current = setInterval(function () {
      console.log("interval");
      if (authContext.isLogined) {
        getUnreadCount();
      }
    }, 2000);

    return () => {
      clearInterval(intervalId.current);
    };
  }, []);

  const getUnreadCount = async () => {
    const response = await chatController.getUnreadCount();
    if (response.code === 200) {
      if (unreadCount != response.data.unread_count) {
        chatContext.getChats();
      }
      setUnreadCount(response.data.unread_count);
      setUserType(response.data.user_type);
      setUnread(response.data);
    }
  };

  // getUnreadCount();

  const handleClick = (id) => {
    if ((id === "account" || id === "chat") && !authContext.isLogined) {
      popupContext.toggleLogin(true);
      return;
    }

    if (id == "chat") {
      chatContext.getChats();
    }

    setIsActive(id);
  };

  return (
    <div
      style={{ backgroundColor: Utils.color.primary }}
      className={`border-r border-gray-700 p-4 bg-slate-900 ${props.className}`}
    >
      <div className="items-center">
        {navigationItem.map((item) => (
          <NavigationTab
            key={item.id}
            {...item}
            isActive={isActive === item.id}
            onClick={() => handleClick(item.id)}
          />
        ))}
        <Divider className="mt-4 mb-2" />
        <NavigationTab
          id={"account"}
          name="Account"
          isActive={isActive === "account"}
          onClick={() => handleClick("account")}
        />
        <NavigationTab
          id={"chat"}
          name={unreadCount > 0 ? `Chat (${unreadCount})` : "Chat"}
          isActive={isActive === "chat"}
          onClick={() => handleClick("chat")}
        />
        <NavigationTab
          id={"users"}
          name="Users"
          isActive={isActive === "users"}
          onClick={() => handleClick("users")}
        />
        <Divider className="mt-4 mb-2" />
        {authContext.isLogined && userType == "User" && (
          <ApplyForLawerDialog data={unread} />
        )}
        {authContext.isLogined && userType == "Lawyer" && (
          <PromotionDialog status={unread} />
        )}
      </div>
    </div>
  );
};

export default Navigation;
