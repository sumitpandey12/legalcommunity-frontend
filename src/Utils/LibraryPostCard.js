import React from "react";
import Utils from "./Utils";
import { useNavigate } from "react-router-dom";

const LibraryItem = ({
  id,
  userName,
  title,
  profileURL,
  description,
  date,
  category,
}) => {
  const newDate = new Date(date).toDateString();
  const navigate = useNavigate();

  const handlerNextPage = () => {
    navigate("details/" + id);
  };

  return (
    <div
      style={{ backgroundColor: Utils.color.primary }}
      className="flex w-full items-center justify-start h-min my-3"
    >
      <div className="rounded-md border border-gray-700 p-5 shadow-md w-full">
        <div className="flex w-full items-center justify-between border-b border-gray-500 pb-3">
          <div className="flex items-center space-x-3">
            <div
              className={`h-8 w-8 rounded-full bg-slate-400 bg-[url(${profileURL})]`}
            ></div>
            <div className="text-lg font-bold text-white">{userName}</div>
          </div>
          <div className="flex items-center space-x-8">
            <button className="rounded-2xl border border-gray-500 bg-neutral-100 px-3 py-1 text-xs font-semibold">
              {category}
            </button>
            <div className="text-xs text-neutral-400">{newDate}</div>
          </div>
        </div>

        <div className="mt-4 mb-6">
          <div
            onClick={() => handlerNextPage()}
            className="mb-3 text-xl font-bold text-left text-white cursor-pointer"
          >
            {title}
          </div>
          <div
            onClick={() => handlerNextPage()}
            dangerouslySetInnerHTML={{ __html: description }}
            className="text-sm text-left text-white cursor-pointer"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LibraryItem;
