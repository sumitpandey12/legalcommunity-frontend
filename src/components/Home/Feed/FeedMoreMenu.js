import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FeedContext } from "../../../Context/FeedContext";
import UserContoller from "../../../APIs/UserController";
import AuthContext from "../../../Context/AuthContext";
import { PopupContext } from "../../../Context/PopupContext";
import { Modal } from "@mui/material";

export default function FeedMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [editShow, setEditShow] = React.useState(false);
  const feedContext = React.useContext(FeedContext);
  const queryRef = React.useRef();

  //Report
  const [showReport, setShowReport] = React.useState(false);
  const reportRef = React.useRef();
  const userController = new UserContoller();
  const authContext = React.useContext(AuthContext);
  const popupContext = React.useContext(PopupContext);

  const reportPostHandler = async (message) => {
    const response = await userController.reportQuery({
      query_id: props.id,
      comment: message,
    });
    setShowReport(false);

    setTimeout(function(){
      alert("Query reported successfully");
    },500);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (item) => {
    if (item.id === 1) {
      setShowReport(true);
      return;
    } else if (item.id === 2) {
      setEditShow(true);
    } else if (item.id === 3) {
      deleteHandler();
    }
    handleClose();
  };

  const [isModifyLoading, setModifyLoading] = React.useState(false);

  const modifyHandler = async (query) => {
    if (isModifyLoading) {
      return;
    }
    setModifyLoading(true);
    const response = await feedContext.modifyPost(props.id, query);
    console.log(response);
    if (response) {
      setEditShow(false);
    }
    setModifyLoading(false);
  };

  const deleteHandler = async () => {
    const response = await userController.deleteQuery({
      query_id: props.id,
    });
    feedContext.refresh();
    console.log(response);
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <BsThreeDotsVertical size={25} />
      </Button>

      {editShow && (
        <Modal open={editShow} onClose={() => setEditShow(false)}>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 flex flex-col items-start bg-[#232936] p-6">
            <h1 className="text-xl font-bold text-white">Modify Query</h1>
            <textarea
              ref={queryRef}
              className="w-full h-full border border-gray-300 h-56 my-2 p-1"
              placeholder="Write here..."
            />

            <Button
              variant="contained"
              onClick={() => modifyHandler(queryRef.current.value)}
              className="w-full"
              color="success"
            >
              Modify
            </Button>
          </div>
        </Modal>
      )}

      {showReport && (
        <Modal open={showReport} onClose={() => setShowReport(false)}>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 flex flex-col items-start bg-[#232936] p-6">
            <h1 className="text-xl font-bold text-white">Report Message</h1>
            <textarea
              ref={reportRef}
              className="w-full h-full border border-gray-300 h-56 my-2 p-1"
              placeholder="Write here..."
            />

            <Button
              variant="contained"
              onClick={() => reportPostHandler(reportRef.current.value)}
              className="w-full"
              color="success"
            >
              Report
            </Button>
          </div>
        </Modal>
      )}

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {authContext?.user?.id !== props.author_id && (
          <MenuItem
            onClick={() => {
              if (!authContext.isLogined) {
                popupContext.toggleLogin(true);
                return;
              }
              handleMenu({ id: 1 });
            }}
          >
            <div>Report Query</div>
          </MenuItem>
        )}
        {authContext.user && authContext.user.id === props.author_id && (
          <MenuItem
            onClick={() => {
              setEditShow(true);
            }}
          >
            <div className="text-red">Edit Query</div>
          </MenuItem>
        )}
        {authContext.user && authContext.user.id === props.author_id && (
          <MenuItem
            onClick={() => {
              handleClose();
              deleteHandler();
            }}
          >
            <div className="text-red">Delete</div>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
