import React from "react";

const Avatars = ({ image, className }) => {
  return (
    <img
      alt="tania andrew"
      src={image}
      className={`relative inline-block h-12 w-12 cursor-pointer rounded-full object-cover object-center"
      data-popover-target="profile-menu ${className}`}
      onError={(e) =>
        (e.target.src =
          "https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
      }
    />
  );
};

export default Avatars;
