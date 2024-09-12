import { Avatar, IconButton } from "@mui/material";
import { blue, deepOrange } from "@mui/material/colors";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NewInput from "../../Utils/NewInput";
import { BiArrowBack } from "react-icons/bi";
import { ChatContext } from "../../Context/ChatContext";
import ChatController from "../../APIs/ChatController";
import AuthContext from "../../Context/AuthContext";
import Spinner from "../../Utils/Spinner";
import Utils from "../../Utils/Utils";
import ReviewDialog from "../../Dialogs/ReviewDialog";

const ChatItem = ({ isMessage }) => {
  const [isAccepted, setIsAccepted] = React.useState(true);
  const [chat, setChat] = React.useState({});
  const [chatHistory, setChatHistory] = React.useState(null);
  const chatContext = React.useContext(ChatContext);
  const params = useParams();

  const [isResolved, setIsResolved] = React.useState(false);

  const intervalId = React.useRef(null);

  const chatController = new ChatController();
  const authContext = React.useContext(AuthContext);

  useEffect(() => {
    setMessageRead();
    getChat();

    intervalId.current = setInterval(function () {
      loadChatHistory();
    }, 1000);

    return () => {
      clearInterval(intervalId.current);
    };
  }, []);

  useEffect(() => {}, [chat]);

  const getChat = async () => {
    const res = await chatController.getChats();
    const filtered = res.filter((chat) => chat.id == params.id);
    setChat(filtered[0]);
    if (filtered[0].status === "Accepted") {
      setIsAccepted(true);
    }
    setIsResolved(
      filtered[0].status === "Resolved" || filtered[0].status === "Reviewed"
    );
  };

  const loadChatHistory = async () => {
    const res = await chatController.getMessages({
      chat_id: params.id,
    });
    setChatHistory(res);
  };

  const setMessageRead = async () => {
    const res = await chatController.setMessageRead({
      chat_id: params.id,
    });
  };

  const urlify=(text)=> {
    const urlRegex = /(http?:\/\/[^\s]+)/g;
    return text.split(urlRegex)
       .map(part => {
        part=part.replace("("," ");
        part=part.replace(").","");
          if(part.match(urlRegex)) {
             return <a href={part}>{part}</a>;
          }
          return part;
       });
  }

  const sendMessage = async (message) => {
    const res = await chatController.addMessage({
      chat_id: params.id,
      message_type: "Text",
      message: message,
    });
  };

  return (
    <div className="relative w-full h-full flex flex-col mb-24">
      <ChatListTile
        {...chat}
        isResolved={isResolved}
        onResolved={() => {
          getChat();
        }}
      />
      <ReviewDialog
        id={params.id}
        isOpen={chat.status === "Resolved" && chat.user_id==authContext.user.id}
        onReviewed={() => getChat()}
      />
      {isAccepted ? (
        <>
          <div className="flex-1 p-4">
            {chatHistory !== null && chatHistory.length > 0 ? (
              chatHistory.map((chat, index) => (
                <Chat
                  key={index}
                  user={chat.sender_id === authContext.user.id}
                  message={urlify(chat.message)}
                />
              ))
            ) : chatHistory !== null ? (
              <div className="text-white">No messages</div>
            ) : (
              <Spinner />
            )}
          </div>

          <div
            style={{
              color: Utils.color.white,
              backgroundColor: Utils.color.primary,
            }}
            className="w-full fixed bottom-0 left-32 inset-x-0 flex justify-center"
          >
            {!isResolved && (
              <NewInput
                onSend={sendMessage}
                placeholder="Type here..."
                className="w-2/3 my-3"
              />
            )}
          </div>
        </>
      ) : (
        <div className="flex-1 flex justify-center items-center">
          <p className="text-gray-500 text-lg text-white">
            Request is pending...
          </p>
        </div>
      )}
    </div>
  );
};

const ChatListTile = ({
  name,
  id,
  expert_id,
  status,
  isResolved,
  onResolved,
}) => {
  const chatContext = React.useContext(ChatContext);
  const authContext = React.useContext(AuthContext);

  const isExpert = expert_id === authContext?.user?.id;

  useEffect(() => {
    console.log("-------------------", isResolved);
  }, []);

  return (
    <div
      style={{ backgroundColor: Utils.color.primary }}
      className="flex justify-between sticky top-0 bg-white z-20 flex gap-4 items-center w-full px-4 py-2 border-b border-gray-500"
    >
      <div className="flex gap-4 items-center">
        <IconButton
          aria-label="delete"
          onClick={() => {
            window.history.back();
            chatContext.getChats();
          }}
          style={{ color: Utils.color.white }}
        >
          <BiArrowBack />
        </IconButton>
        <Avatar sx={{ bgcolor: true ? deepOrange[500] : blue[500] }}>
          {name && name[0].toUpperCase()}
        </Avatar>
        <p className="text-md font-semibold text-white">{name}</p>
      </div>
      {isExpert && (
        <div
          onClick={async () => {
            if (isResolved) {
              return;
            }
            await chatContext.markResolved(id);
            onResolved();
          }}
          className={`mr-4 text-sm text-white ${
            isResolved
              ? "bg-gray-700 hover:bg-gray-600"
              : "bg-green-700 hover:bg-green-800"
          } cursor-pointer px-3 rounded-full py-1`}
        >
          {status == "Accepted" && "Resolve"}
          {status == "Resolved" && "Resolved"}
          {status == "Reviewed" && "Reviewed"}
        </div>
      )}
    </div>
  );
};

const Chat = ({ user, message }) => {
  return (
    <div
      className={`flex  my-2 text-left ${
        user ? "flex-row-reverse" : "flex-row"
      } w-full items-end gap-1`}
    >
      <Avatar
        image={
          "https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        className={"w-6 h-6"}
      />

      <p
        style={{
          backgroundColor: user ? Utils.color.secondary : Utils.color.tertiary,
          whiteSpace: "pre-line",
        }}
        className={`${
          user
            ? "bg-amber-950 text-white rounded-bl-xl"
            : "bg-amber-100 rounded-br-xl"
        } rounded-tl-xl max-w-3xl rounded-tr-xl px-4 py-2`}
      >
        {message}
      </p>
    </div>
  );
};
export default ChatItem;
