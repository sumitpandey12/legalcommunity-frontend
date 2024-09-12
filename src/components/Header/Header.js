import React, { useContext, useRef } from "react";
import Button from "../../Utils/Button";
import SearchBox from "./SearchBox";
import Modal from "../../Utils/Modal";
import Divider from "../../Utils/Divider";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { MdPostAdd } from "react-icons/md";
import AuthContext from "../../Context/AuthContext";
import ButtonWidet from "../../Utils/ButtonWidet";
import { RiImageAddLine } from "react-icons/ri";
import { LuMessagesSquare } from "react-icons/lu";
import UserContoller from "../../APIs/UserController";
import { useFilePicker } from "use-file-picker";
import { ChatContext } from "../../Context/ChatContext";
import { PopupContext } from "../../Context/PopupContext";
import Utils from "../../Utils/Utils";
import logo from "../../logo.png";
import LegalQueryDialog from "../../Dialogs/LegalQueryDialog";
import ReviewDialog from "../../Dialogs/ReviewDialog";

const Header = (props) => {
  const [isLogin, setIsLogin] = React.useState(false);
  const [isRaiseQuery, setIsRaiseQuery] = React.useState(false);
  const popupContext = useContext(PopupContext);

  const authContext = useContext(AuthContext);

  const queryRef = useRef("");
  const attachImageRef = useRef(null);

  const userController = new UserContoller();

  const toggleRaiseQuery = () => setIsRaiseQuery(!isRaiseQuery);
  const [isLegalLoading, setLegalLoading] = React.useState(false);

  const [isFile, setFile] = React.useState(false);

  const { openFilePicker, filesContent, loading } = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
  });

  const raiseQuery = async () => {
    if (isLegalLoading) {
      return;
    }
    setLegalLoading(true);
    if (queryRef.current.value.length < 5) return;

    const query = new FormData();
    query.append("query_content", queryRef.current.value);

    if (isFile !== false) {
      query.append("file", isFile);
    }

    console.log(query);
    const response = await userController.raiseQuery(query);
    if (response.code === 200) {
      setIsRaiseQuery(false);
    }
    setLegalLoading(false);
  };

  const handlerFileSelector = () => {
    openFilePicker();
    if (!loading && filesContent[0] !== undefined) {
      setFile(true);
      console.log(attachImageRef.current);
    }
  };

  const handlerFileUpload = (e) => {
    setFile(e.target.files[0]);
    console.log(isFile);
  };

  //Notifications
  const [isNotificationOpen, setNotificationOpen] = React.useState(false);
  const chatContext = useContext(ChatContext);

  return (
    <header
      style={{
        backgroundColor: Utils.color.secondary,
        boxShadow: `1px 2px 1px ${Utils.color.fusion}`,
      }}
      className={`sticky top-0 flex justify-between items-center p-4 h-16 ${props.className}`}
    >
      <img src={logo} className="h-14 w-14" />
      {authContext.user && authContext.user.name && (
        <p className="font-bold text-white">Hi, {authContext.user.name}</p>
      )}
      <SearchBox />

      <ReviewDialog />

      <div className="flex gap-4 items-center">
        {/* <div
          onClick={() => setNotificationOpen(!isNotificationOpen)}
          className="relative cursor-pointer"
        >
          <LuMessagesSquare color={Utils.color.primary} size={28} />
          <div className="w-2 h-2 bg-red-500 rounded-full absolute -top-1 right-1"></div>
        </div> */}

        {authContext.user !== null && <LegalQueryDialog />}

        {authContext.user === null && (
          <Button
            title="Sign In"
            onClick={() => popupContext.toggleLogin(true)}
          />
        )}

        {authContext.user !== null && (
          <Button
            title="Sign Out"
            className="bg-red-500"
            onClick={() => authContext.logout()}
          />
        )}
      </div>

      <NotificationModal
        show={isNotificationOpen}
        onClose={() => setNotificationOpen(false)}
      >
        <div className="flex flex-col justify-start mt-1 mb-4 h-1/4 overflow-y-auto">
          {chatContext.requestNotifications &&
          chatContext.requestNotifications.length > 0 ? (
            chatContext.requestNotifications.map((notification, index) => {
              if (notification.status != "Pending") return;
              return (
                <NotificationItem
                  key={index}
                  title={notification.name}
                  message={notification.title}
                  onAccept={() => chatContext.acceptRequest(notification.id)}
                  onReject={() => chatContext.rejectRequest(notification.id)}
                />
              );
            })
          ) : (
            <div className="flex justify-center items-center h-full">
              <p>No Request!</p>
            </div>
          )}
        </div>
      </NotificationModal>

      <Modal
        className="w-1/3"
        show={isRaiseQuery}
        onClose={() => toggleRaiseQuery()}
      >
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

        <Button
          isLoading={isLegalLoading}
          title="Submit"
          onClick={raiseQuery}
        />
      </Modal>

      <Modal
        show={popupContext.loginShow}
        onClose={() => popupContext.toggleLogin(false)}
      >
        {isLogin ? (
          <LoginForm
            onClose={() => popupContext.toggleLogin(false)}
            onSignUp={() => setIsLogin(false)}
          />
        ) : (
          <SignupForm
            onClose={() => popupContext.toggleLogin(false)}
            onSignUp={() => setIsLogin(true)}
          />
        )}
      </Modal>
    </header>
  );
};

const NotificationModal = ({ show, children, onClose }) => {
  if (!show) return null;
  return (
    <div onClick={onClose} className="w-full h-full fixed z-50 right-0 top-16">
      <div className="fixed z-50 right-16 top-16 border border-gray-500 bg-white w-1/4 h-2/4 shadow-lg overflow-auto">
        <div className="px-4 py-4">{children}</div>
      </div>
    </div>
  );
};

const NotificationItem = ({ title, message, onAccept, onReject }) => {
  return (
    <div className="flex justify-between items-center border-b border-gray-500 py-2">
      <div className="flex flex-col gap-1 justify-start items-start">
        <p className="text-lg font-bold">{title}</p>
        <p className="text-sm">{message}</p>
      </div>
      <div className="flex flex-col gap-2">
        <div
          onClick={(e) => {
            e.stopPropagation();
            onAccept();
          }}
          className="text-lg text-blue-500 cursor-pointer"
        >
          Accept
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            onReject();
          }}
          className="text-lg text-red-500 cursor-pointer"
        >
          Reject
        </div>
      </div>
    </div>
  );
};

export default Header;
