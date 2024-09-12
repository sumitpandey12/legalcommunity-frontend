import React, { useState } from "react";
import ButtonWidet from "../Utils/ButtonWidet";
import Modal from "../Utils/Modal";
import { RiImageAddLine } from "react-icons/ri";
import Button from "../Utils/Button";
import UserContoller from "../APIs/UserController";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { MdPostAdd } from "react-icons/md";
import { ChatContext } from "../Context/ChatContext";
import { FeedContext } from "../Context/FeedContext";

const LegalQueryDialog = () => {
  const [open, setOpen] = useState(false);
  const [activeChild, setActiveChild] = useState(null);

  const handleOpenChild = (child) => {
    setOpen(false);
    setActiveChild(child);
  };

  return (
    <div>
      <ButtonWidet onClick={() => setOpen(true)}>
        <div className="flex gap-1">
          <MdPostAdd size={25} />
          <p>Legal Query</p>
        </div>
      </ButtonWidet>
      <Modal show={open} onClose={() => setOpen(false)}>
        <h1 className="text-2xl font-bold text-white mb-4">Select Options</h1>
        <ButtonWidet className="mb-4" onClick={() => handleOpenChild("query")}>
          Raise Query
        </ButtonWidet>
        <ButtonWidet onClick={() => handleOpenChild("lawyer")}>
          Lawyer Consultation
        </ButtonWidet>
      </Modal>

      <PostQueryDialog
        open={activeChild === "query"}
        onClose={() => setActiveChild(null)}
      />
      <RequestLawerDialog
        open={activeChild === "lawyer"}
        onClose={() => setActiveChild(null)}
      />
    </div>
  );
};

function PostQueryDialog({ open, onClose }) {
  const [isFile, setIsFile] = useState(false);
  const [isLegalLoading, setLegalLoading] = React.useState(false);
  const feedContext = React.useContext(FeedContext);

  const queryRef = React.createRef();
  const attachImageRef = React.createRef();

  const userController = new UserContoller();

  const handlerFileUpload = (e) => {
    setIsFile(e.target.files[0]);
    console.log(isFile);
  };

  const raiseQuery = async () => {
    if (isLegalLoading) {
      return;
    }
    setLegalLoading(true);
    if (queryRef.current.value.length < 5) return;

    const query = new FormData();
    query.append("query_content", queryRef.current.value);
    query.append("is_lawyer_request", 0);
    query.append("category_id", -1);

    if (isFile !== false) {
      query.append("file", isFile);
    }

    console.log(query);
    const response = await userController.raiseQuery(query);
    if (response.code === 200) {
      onClose();
      feedContext.refresh();
    }
    setLegalLoading(false);
  };

  return (
    <Modal show={open} onClose={onClose}>
      <h1 className="text-xl font-bold text-white">Raise Query</h1>
      <textarea
        ref={queryRef}
        className="w-full h-full border border-gray-300 h-56 my-2 p-1"
        placeholder="Write here..."
      />
      {isFile !== false && (
        <img
          ref={attachImageRef}
          src={URL.createObjectURL(isFile)}
          className="w-1/2 h-1/2"
        />
      )}

      <div className="flex justify-start mt-1 mb-4">
        <input
          hidden
          type="file"
          id="fileUpload"
          onChange={handlerFileUpload}
        />
        <div
          onClick={() => {
            document.getElementById("fileUpload").click();
          }}
          className="flex gap-1 items-center cursor-pointer"
        >
          <RiImageAddLine size={18} color="#fff" />
          <p className="text-sm text-white">Attach Image</p>
        </div>
      </div>

      <Button isLoading={isLegalLoading} title="Submit" onClick={raiseQuery} />
    </Modal>
  );
}

const categoryList = [
  {
    id: 0,
    category: "All",
    created_at: "2024-08-31T19:46:07.000Z",
  },
  {
    id: 8,
    category: "Company Law",
    created_at: "2024-09-08T17:38:39.000Z",
  },
  {
    id: 9,
    category: "Labor Law",
    created_at: "2024-09-08T17:38:50.000Z",
  },
  {
    id: 10,
    category: "Real Estate Law",
    created_at: "2024-09-08T17:39:00.000Z",
  },
  {
    id: 11,
    category: "Child Protection Law",
    created_at: "2024-09-08T17:39:12.000Z",
  },
  {
    id: 12,
    category: "Criminal Law",
    created_at: "2024-09-08T17:39:39.000Z",
  },
];

function RequestLawerDialog({ open, onClose }) {
  const [category, setCategory] = useState("");
  const [isLoading, setLoading] = React.useState(false);
  const queryRef = React.createRef();

  const userController = new UserContoller();

  const handlerCategory = (e) => {
    setCategory(e.target.value);
  };

  const handlerSubmit = async () => {
    if (isLoading) {
      return;
    }
    setLoading(true);
    if (queryRef.current.value.length < 5) return;

    const query = new FormData();
    query.append("query_content", queryRef.current.value);
    query.append("is_lawyer_request", 1);
    query.append("category_id", category);

    console.log(query);
    const response = await userController.raiseQuery(query);
    if (response.code === 200) {
      onClose();
    }
    setLoading(false);
  };

  return (
    <Modal show={open} onClose={onClose}>
      <h1 className="text-lg font-bold mb-4 text-white">Lawer Consultation</h1>
      <FormControl
        className=""
        sx={{
          mb: 2,
          width: "100%",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#fff",
            },
            "&:hover fieldset": {
              borderColor: "#fff",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#fff",
            },
          },
        }}
      >
        <InputLabel
          id="demo-simple-select-helper-label"
          sx={{
            color: "#fff",
            "&.Mui-focused": {
              color: "#fff",
            },
          }}
        >
          Category
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={category}
          label="Category"
          onChange={handlerCategory}
          sx={{
            color: "#fff",
          }}
        >
          {categoryList.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <textarea
        ref={queryRef}
        className="w-full h-full border border-gray-300 h-56 my-2 p-1"
        placeholder="Write here..."
      />
      <Button
        isLoading={isLoading}
        onClick={() => handlerSubmit()}
        title="Submit"
      />
    </Modal>
  );
}

export default LegalQueryDialog;
