import React from "react";
import { Outlet } from "react-router-dom";

const ChatLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ChatLayout;
