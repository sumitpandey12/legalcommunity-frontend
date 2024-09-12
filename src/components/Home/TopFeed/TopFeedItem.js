import React from "react";
import { Link } from "react-router-dom";

const TopFeedItem = ({ id, imageURL, title, desc }) => {
  return (
    <Link
      to={`/post/${id}`}
      className="relative w-72 h-54 flex-shrink-0 rounded-lg"
    >
      <img
        className="w-full h-full object-cover rounded-lg"
        src={
          imageURL == null || imageURL == ""
            ? "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
            : imageURL
        }
        alt={title}
      />
      <div className="absolute w-full bottom-0 top-5 left-0 z-10 bg-gradient-to-t from-black px-2 py-1 flex flex-col rounded-b-lg justify-end">
        <span className="text-white text-lg font-bold text-start">{title}</span>
        {/* <span className="text-white text-sm">{desc}</span> */}
      </div>
    </Link>
  );
};

export default TopFeedItem;
