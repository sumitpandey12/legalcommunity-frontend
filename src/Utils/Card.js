import React from "react";
import Utils from "./Utils";

const Card = (props) => {
  return (
    <div
      style={{ backgroundColor: Utils.color.primary }}
      className={`whitespace-normal break-words rounded-lg border border-gray-700 bg-white p-4 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none ${props.className}`}
    >
      {props.children}
    </div>
  );
};

export default Card;
