import React from "react";

const InputBox = ({ placeholder, onChange, className, value }) => {
  const onInputChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div
      className={`rounded-full border border-gray-300 px-4 py-2 w-full flex items-center gap-2 ${className}`}
    >
      <input
        value={value}
        onChange={(e) => onInputChange(e)}
        type="text"
        className="border-0 outline-0 w-full"
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputBox;
