import React, { useContext } from "react";
import {
  RiHomeLine,
  RiCompassDiscoverFill,
  RiAccountCircleLine,
  RiRobot3Fill,
} from "react-icons/ri";
import { IoChatbubblesOutline } from "react-icons/io5";

import { IoLibrary } from "react-icons/io5";
import { Link } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import Utils from "../../Utils/Utils";
import { FaUsers } from "react-icons/fa6";

const NavigationTab = ({ id, name, isActive, onClick }) => {
  const authContext = useContext(AuthContext);

  if (authContext.user === null && (id === "account" || id === "chat"))
    return null;

  return (
    <Link
      to={"/" + id}
      onClick={() => onClick(id)}
      style={{ backgroundColor: isActive ? Utils.color.secondary : "" }}
      className={`flex items-center gap-4 rounded px-4 py-2 my-2 cursor-pointer ${
        isActive ? "bg-amber-700" : ""
      }`}
    >
      {getTabIcon(id, isActive)}
      <span className={"text-white"}>{name}</span>
    </Link>
  );
};

function getTabIcon(id, active) {
  switch (id) {
    case "feeds":
      return <RiHomeLine size={20} color={"#fff"} />;
    case "discover":
      return <RiCompassDiscoverFill size={20} color={"#fff"} />;
    case "account":
      return <RiAccountCircleLine size={20} color={"#fff"} />;
    case "library":
      return <IoLibrary size={20} color={"#fff"} />;
    case "chatbot":
      return <RiRobot3Fill size={20} color={"#fff"} />;
    case "chat":
      return <IoChatbubblesOutline size={20} color={"#fff"} />;
    case "users":
      return <FaUsers size={20} color={"#fff"} />;
    default:
      return <IoChatbubblesOutline size={20} color={"#fff"} />;
  }
}

export default NavigationTab;
