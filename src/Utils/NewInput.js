import React, { useRef } from "react";
import { IoMdSend } from "react-icons/io";
import Utils from "./Utils";

const NewInput = (props) => {
  const messageRef = useRef(null);

  const onSend = () => {
    if (props.disabled) {
      return;
    }
    if (messageRef.current.value.length < 1) return;
    props.onSend(messageRef.current.value);
    messageRef.current.value = "";
  };

  const handleKeyPress = (event) => {
    if(event.keyCode === 13){
      onSend();
    }
  }

  return (
    <div
      style={{ backgroundColor: Utils.color.white }}
      className={`rounded-full border border-gray-300 px-4 py-2 w-1/2 flex items-center gap-2 ${props.className}`}
    >
      <input
        disabled={props.disabled}
        ref={messageRef}
        type="text"
        onKeyDown={handleKeyPress}
        className="border-0 outline-0 w-full text-black"
        placeholder={props.placeholder}
      />
      <IoMdSend
        className="cursor-pointer text-black"
        onClick={onSend}
        size={20}
      />
    </div>
  );
};

export default NewInput;
