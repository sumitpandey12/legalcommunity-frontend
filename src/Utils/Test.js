import React from "react";

const Test = () => {
  return (
    <div className="flex overflow-x-scroll space-x-4 p-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="w-72 h-24 bg-blue-500 flex-shrink-0"></div>
      ))}
    </div>
  );
};

export default Test;
