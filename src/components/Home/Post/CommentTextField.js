import React from "react";
import Button from "../../../Utils/Button";
import Avatars from "../../../Utils/Avatars";
import Utils from "../../../Utils/Utils";
import { FaUser } from "react-icons/fa";

const CommentTextField = ({ user_profile, onPost, placeholder, className }) => {
  const [comment, setComment] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  const onInputChange = (e) => {
    setComment(e.target.value);
  };

  const onPostClick = () => {
    setLoading(true);
    onPost(comment);
    setComment("");
    setLoading(false);
  };

  return (
    <div className={`flex items-center gap-2 w-full ${className}`}>
      <div className="flex items-center justify-center p-3 bg-white rounded-full">
        <FaUser />
      </div>
      <input
        value={comment}
        style={{ backgroundColor: Utils.color.white }}
        onChange={onInputChange}
        type="text"
        className="border-0 outline-0 w-full rounded-full bg-amber-50 px-4 py-2"
        placeholder={placeholder}
      />
      <Button isLoading={isLoading} title="Post" onClick={onPostClick} />
    </div>
  );
};

export default CommentTextField;
