import React, { useEffect } from "react";
import Utils from "../../Utils/Utils";
import { BiArrowBack } from "react-icons/bi";
import { IconButton } from "@mui/material";
import { FaUser } from "react-icons/fa";
import Divider from "../../Utils/Divider";
import { useParams } from "react-router-dom";
import Spinner from "../../Utils/Spinner";
import PublicController from "../../APIs/PublicController";

const LibraryDetails = () => {
  const [library, setLibrary] = React.useState(null);

  const params = useParams();
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const response = await new PublicController().getMyLibrary(params.id);
    console.log("Library Details Page", response);
    setLibrary(response);
  }

  if (library === null) {
    return <Spinner />;
  }

  const newDate = new Date(library.created_at).toDateString();

  return (
    <div
      style={{ backgroundColor: Utils.color.primary }}
      className="flex items-center justify-start h-min my-3"
    >
      <div className="p-5 w-9/12">
        <div className="flex w-full items-center justify-between border-b border-gray-700 pb-5">
          <div className="flex items-center space-x-3">
            <IconButton
              aria-label="delete"
              onClick={() => {
                window.history.back();
              }}
              style={{ color: Utils.color.white }}
            >
              <BiArrowBack />
            </IconButton>
            <div className="flex items-center justify-center p-3 bg-white rounded-full">
              <FaUser />
            </div>
            <div className="text-lg font-bold text-white">
              {library.userName}
            </div>
          </div>
          <div className="flex items-center space-x-8">
            <button className="rounded-2xl border border-gray-500 bg-neutral-100 px-3 py-1 text-xs font-semibold">
              {library?.category}
            </button>
            <div className="text-xs text-neutral-500">{newDate}</div>
          </div>
        </div>

        <div className="mt-6 mb-6">
          <div className="mb-4 text-2xl font-bold text-left text-white">
            {library.title}
          </div>
          {/* <Divider className="bg-gray-700" /> */}
          <div
            dangerouslySetInnerHTML={{ __html: library.data }}
            className="text-lg text-left text-white"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LibraryDetails;
