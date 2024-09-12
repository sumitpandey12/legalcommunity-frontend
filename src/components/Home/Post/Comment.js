import React from "react";
import Avatars from "../../../Utils/Avatars";
import { Avatar } from "@mui/material";
import Utils from "../../../Utils/Utils";

const Comment = ({ user_profile, image_url, className, comment }) => {
  return (
    <div className={`p-2 flex items-start w-full ${className}`}>
      <Avatar
        style={{ backgroundColor: Utils.color.secondary }}
        className="w-8 h-8"
      >
        S
      </Avatar>
      <div
        style={{ backgroundColor: Utils.color.secondary }}
        className="flex items-start bg-amber-100 rounded-lg px-4 py-2 ms-3"
      >
        <span className="font-bold text-sm">{user_profile}</span>
        <p className="text-lg text-start text-white">{comment}</p>
      </div>
    </div>
  );
};

export default Comment;
