import React, { useEffect, useState,useRef} from "react";
import NewInput from "../../Utils/NewInput";
import Avatar from "../../Utils/Avatars";
import Utils from "../../Utils/Utils";
import ChatController from "../../APIs/ChatController";
import AuthContext from "../../Context/AuthContext";
import Button from "../../Utils/Button";
import { PopupContext } from "../../Context/PopupContext";
import { useNavigate } from "react-router-dom";

const ChatBot = () => {
  const [chats, setChats] = React.useState([]);
  const chatController = new ChatController();
  const authContext = React.useContext(AuthContext);
  const popupContext = React.useContext(PopupContext);
  const [isStart, setStart] = React.useState(false);
  const navigate = useNavigate();
  const messagesRef = useRef(null);

  const createChat = async () => {
    console.log("create chat");
    const response = await chatController.createChat();
    let id = response.id;
    localStorage.setItem('chatID', id);
    loop();
  };

  const loop = () =>{
    setInterval(function() {
      console.log("looping...")
      loadChatHistory();
      }, 2000);
  }

  const loadChatHistory = async () => {
    const id = localStorage.getItem('chatID')
    const res = await chatController.getMessages({
      chat_id: id,
    });
    setChats(res);
  };

  const sendMessage = async (message) => {
    const id = localStorage.getItem('chatID')
    const res = await chatController.addMessage({
      chat_id: id,
      message_type: "Text",
      message: message,
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

  const scrollToBottom = () => {
    messagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative w-full h-full flex flex-col ">
      <div className="h-full mb-24 p-4 overflow-y-auto hide-scrollbar" ref={messagesRef}>
        {authContext.isLogined ? (isStart?  (
         chats&& chats.map((chat, index) => (
            <Chat
              key={index}
              user={chat.sender_id == authContext.user.id}
              message={urlify(chat.message)}
            />
          ))
        ):<div className="w-full h-full flex flex-col justify-center items-center gap-2">
        <div className="text-white text-lg font-semibold">
          Welcome, to the AI Expert. Click to start the chat.
        </div>
        <Button
          title="Start"
          onClick={() => {
            setStart(true);
            createChat()
          }}
        />
      </div>) : (
          <div className="w-full h-full flex flex-col justify-center items-center gap-2">
            <div className="text-white text-lg font-semibold">
              Welcome, to the AI Expert. Login to get reponses.
            </div>
            <Button
              title="Login"
              onClick={() => {
                popupContext.toggleLogin(true);
              }}
            />
          </div>
        )}
      </div>
      {isStart && <div
        style={{ backgroundColor: Utils.color.primary }}
        className="w-full fixed bottom-0 left-32 inset-x-0 flex justify-center"
      >
        <NewInput
          onSend={sendMessage}
          placeholder="Type here..."
          className="w-2/3 my-3"
          disabled={!authContext.isLogined}
        />
      </div>}
    </div>
  );
};

const Chat = ({ user, message }) => {
  return (
    <div
      className={`flex my-2 text-left ${
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
        dangerouslySetInnerHTML={{ __html: message }}
        style={{ backgroundColor: user?Utils.color.secondary:Utils.color.tertiary,whiteSpace:"pre-line"}}
        className={`${
          user
            ? "bg-amber-950 text-white rounded-bl-xl"
            : "bg-amber-100 rounded-br-xl"
        } rounded-tl-xl max-w-3xl  rounded-tr-xl px-4 py-2`}
      >
      </p>
    </div>
  );
};

export default ChatBot;
