import React from "react";
import Utils from "./Utils";

const Divider = ({ className }) => {
  return (
    <div
      style={{ backgroundColor: Utils.color.divider }}
      className={`h-[1px] w-full bg-gray-300 my-6 ${className}`}
    ></div>
  );
};

export default Divider;
