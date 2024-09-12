import React, { useEffect } from "react";
import { GoLaw } from "react-icons/go";
import {
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Tooltip,
} from "@mui/material";
import { IoMdCloudUpload } from "react-icons/io";
import Button from "../Utils/Button";
import { IoCloseCircleOutline, IoTimerOutline } from "react-icons/io5";
import PublicController from "../APIs/PublicController";
import UserContoller from "../APIs/UserController";
import Utils from "../Utils/Utils";
import AuthContext from "../Context/AuthContext";

const ApplyForLawerDialog = ({ data }) => {
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState("");
  const [categoryList, setCategoryList] = React.useState([]);
  const [isFile, setIsFile] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);

  const descriptionRef = React.useRef(null);

  const publicController = new PublicController();
  const userController = new UserContoller();

  const authContext = React.useContext(AuthContext);

  useEffect(() => {
    if (data.user_type == "Lawyer" && !authContext.isLawyer) {
      authContext.logout();
      return;
    }
    if (open) {
      getCategories();
    }
  }, [open]);

  const getCategories = async () => {
    const response = await publicController.getCategories();
    setCategoryList(response);
  };

  const handlerCategory = (e) => {
    setCategory(e.target.value);
  };

  const handlerFileUpload = (e) => {
    setIsFile(e.target.files[0]);
    console.log(isFile);
  };

  const handlerSubmit = async () => {
    if (isFile === false) {
      alert("Please upload a file");
      return;
    }
    if (category === "") {
      alert("Please select a category");
      return;
    }
    if (descriptionRef.current.value === "") {
      alert("Please fill in the description");
      return;
    }
    if (isLoading) {
      return;
    }
    setLoading(true);

    const query = new FormData();
    query.append("information", descriptionRef.current.value);
    query.append("category_id", category);

    if (isFile !== false) {
      query.append("file", isFile);
    }

    const response = await userController.applyForExpert(query);
    if (response.code === 200) {
    }
    setLoading(false);

    setOpen(false);
  };

  const handleOpen = () => {
    if (data.application_status === "Applied") {
      alert(data.application_status_message);
      return;
    }
    if (data.application_status === "Rejected") {
      alert(data.application_status_message);
    }
    setOpen(true);
  };

  return (
    <div>
      <div
        onClick={() => handleOpen()}
        className={`flex items-center gap-2 rounded px-2 py-2 my-2 cursor-pointer`}
      >
        <GoLaw size={25} color="#fff" />
        <span className={"text-white"}>Apply for lawyer</span>
        {data.application_status === "Applied" && (
          <Tooltip title="Pending">
            <div className="p-1 rounded-full bg-gray-500">
              <IoTimerOutline size={22} color="#fff" />
            </div>
          </Tooltip>
        )}
        {data.application_status === "Rejected" && (
          <Tooltip title="Rejected">
            <div className="p-1 rounded-full bg-red-500">
              <IoCloseCircleOutline size={22} color="#fff" />
            </div>
          </Tooltip>
        )}
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 flex flex-col items-start bg-[#232936] p-6">
          <h1 className="text-lg font-bold mb-4 text-white self-center">
            Apply for Lawyer
          </h1>
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
          <label className="text-white">Description</label>
          <textarea
            ref={descriptionRef}
            className="w-full h-full border border-gray-300 h-56 my-2 p-1"
            placeholder="Write here..."
          />

          <div className="flex justify-start mt-2 mb-4">
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
              <IoMdCloudUpload size={18} color="#fff" />
              <p className="text-sm text-white">
                {" "}
                {isFile ? isFile.name : "Attach Document"}
              </p>
            </div>
          </div>

          <Button
            className="w-full"
            onClick={() => handlerSubmit()}
            title="Apply"
          />
        </div>
      </Modal>
    </div>
  );
};

export default ApplyForLawerDialog;
