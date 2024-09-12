import { Rating, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ButtonWidet from "../Utils/ButtonWidet";
import { CiStar } from "react-icons/ci";
import Modal from "../Utils/Modal";
import Button from "../Utils/Button";
import UserContoller from "../APIs/UserController";
import { useRef } from "react";

const ReviewDialog = ({ id, isOpen, onReviewed }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [isLoading, setLoading] = React.useState(false);

  const userController = new UserContoller();
  const ref = useRef(null);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleSubmit = () => {
    if (isLoading) {
      return;
    }
    setLoading(true);
    userController
      .reviewQuery({
        chat_id: id,
        reviews: ref.current.value,
        rating: value,
      })
      .then((response) => {
        setLoading(false);
        setOpen(false);
        onReviewed();
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
      });
  };

  return (
    <div>
      <Modal show={open} onClose={() => setOpen(false)}>
        <h1 className="text-2xl font-bold text-white mb-4">Feedback</h1>

        <div className="flex flex-col items-start">
          <p className="text-white mb-1 text-md font-normal">Rate the Expert</p>
          <Rating
            name="no-value"
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
          />

          <p className="text-white mb-1 text-md font-normal mt-4 mb-1">
            Message
          </p>
          <textarea
            ref={ref}
            className="w-full border border-gray-500 rounded-lg p-2"
            placeholder="Enter your message"
          ></textarea>
        </div>

        <Button
          onClick={handleSubmit}
          isLoading={isLoading}
          title="Submit"
          className="w-full mt-4"
        />
      </Modal>
    </div>
  );
};

export default ReviewDialog;
