import React, { useContext, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import NewInput from "../../Utils/NewInput";
import { Avatar } from "@mui/material";
import { blue, deepOrange } from "@mui/material/colors";
import { Link, Route, Routes } from "react-router-dom";
import ChatBot from "../ChatBot/ChatBot";
import { ChatContext } from "../../Context/ChatContext";
import APIURLs from "../../APIs/APIUrls";
import { socket } from "../../socket";
import Spinner from "../../Utils/Spinner";
import Utils from "../../Utils/Utils";
import { io } from "socket.io-client";


const Chat = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const chatContext = useContext(ChatContext);

  if (chatContext.messagesChat == null || chatContext.requestsChat == null) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="w-full p-4">
        {
          chatContext.messagesChat.length > 0 ? (
            chatContext.messagesChat.map((item, index) => (
              <ChatListTile isMessage={true} key={index} {...item} />
            ))
          ) : (
            <div className="text-white">No Messages Found!</div>
          )
        }
      </div>
    </div>
  );
};

const ChatListTile = ({
  isMessage,
  name,
  prfile,
  id,
  last_message,
  last_message_time,
  unread_count
}) => {
  const newDate =
    last_message_time !== null
      ? new Date(last_message_time).toLocaleString()
      : "";

  return (
    <Link
      to={`${isMessage ? "message" : "request"}/${id}`}
      className="w-full px-4"
    >
      <div className="flex border-b border-gray-700 pb-4">
        <div className="flex gap-4 w-9/12">
          <Avatar
            src={prfile}
            sx={{ bgcolor: isMessage ? deepOrange[500] : blue[500] }}
          >
            {name && name[0]?.toUpperCase()}
          </Avatar>
          <div className="items-start text-start">
            <p className="text-md font-semibold text-white">{name}</p>
            <p className="text-sm text-white line-clamp-1">{last_message}</p>
          </div>
        </div>
        <div className="w-3/12">
          { unread_count>0 && <div style={{backgroundColor:Utils.color.tertiary,width:"24px",height:"24px",marginLeft:"auto",marginRight:"24px"}} className="rounded-full">{unread_count}</div>}
          <p className="text-sm mt-2 text-gray-300 mr-6 text-end">{newDate}</p>
        </div>
      </div>
    </Link>
  );
};

const TabMenu = ({ selectedTab, setSelectedTab }) => {
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        color="secondary"
        value={selectedTab}
        onChange={handleChange}
        aria-label="secondary tabs example"
        TabIndicatorProps={{
          sx: {
            backgroundColor: Utils.color.secondary,
          },
        }}
      >
        <Tab
          sx={{
            color: Utils.color.white,
            "&.Mui-selected": {
              color: Utils.color.secondary,
            },
          }}
          value={0}
          label="Query Request"
        />
        <Tab
          sx={{
            color: Utils.color.white,
            "&.Mui-selected": {
              color: Utils.color.secondary,
            },
          }}
          value={1}
          label="Query Response"
        />
      </Tabs>
    </Box>
  );
};

export default Chat;
