import React, { useState } from "react";
import Utils from "./Utils";

const ButtonWidet = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={props.onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: isHovered ? "#a38b67" : Utils.color.tertiary,
        color: Utils.color.senary,
      }}
      className={`rounded-full px-6 py-2 font-bold cursor-pointer ${props.className}`}
    >
      {props.children}
    </div>
  );
};

export default ButtonWidet;
