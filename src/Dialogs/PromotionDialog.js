import React, { useEffect } from "react";
import { FiTrendingUp } from "react-icons/fi";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  Tooltip,
} from "@mui/material";
import Button from "../Utils/Button";
import UserContoller from "../APIs/UserController";
import Divider from "../Utils/Divider";
import { IoTimerOutline } from "react-icons/io5";

const PromotionDialog = ({ status }) => {
  const [options, setOptions] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [selectedOptionId, setSelectedOptionId] = React.useState(null);
  const userController = new UserContoller();

  useEffect(() => {
    getOptions();
  }, [open]);

  const getOptions = async () => {
    const response = await userController.getPromotions();
    setOptions(response);
  };

  const handleOpen = () => {
    if (status.promotion_status == "Pending") {
      alert("You have already applied for promotion.");
      return;
    }

    if (status.promotion_status == "Accepted") {
      alert("You have already promoted.");
      return;
    }
    if (status === 1) {
      alert("You have already applied for promotion.");
      return;
    }
    setOpen(true);
  };

  const handleSubmit = async () => {
    if (!selectedOptionId) {
      alert("Please select a promotion option.");
      return;
    }

    setLoading(true);

    const selectedOption = options.find(
      (option) => option.id === parseInt(selectedOptionId)
    );

    if (!selectedOption) {
      alert("Invalid promotion option selected.");
      setLoading(false);
      return;
    }

    const data = {
      promo_id: selectedOption.id,
      validity: selectedOption.validity,
    };

    try {
      const response = await userController.requestPromotions(data);
      console.log("Promotion applied:", response);
      alert("Promotion applied successfully!");
      setOpen(false);
    } catch (error) {
      console.error("Error applying promotion:", error);
      alert("Failed to apply promotion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        onClick={() => handleOpen()}
        className={`flex items-center gap-4 rounded px-4 py-2 my-2 cursor-pointer`}
      >
        <FiTrendingUp size={25} color="#fff" />
        <span className={"text-white"}>Promotion</span>
        {status?.is_promoted === 1 && (
          <span className="text-white text-sm font-bold p-1 bg-green-700 rounded">
            active
          </span>
        )}
        {status?.is_promoted === 0 &&
          status?.promotion_status === "Pending" && (
            <Tooltip title="Rejected">
              <div className="p-1 rounded-full bg-gray-500">
                <IoTimerOutline size={22} color="#fff" />
              </div>
            </Tooltip>
          )}
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 flex flex-col items-start bg-[#232936] p-6">
          <h1 className="text-2xl font-bold text-white">Promotion</h1>
          <Divider />
          <div className="flex flex-col items-start">
            <div className="text-white text-md font-semibold mb-4">
              Select Duration
            </div>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              onChange={(e) => setSelectedOptionId(e.target.value)}
            >
              {options.map((option) => (
                <FormControlLabel
                  key={option.id}
                  value={option.id}
                  control={<Radio />}
                  label={option.info}
                  className="text-white text-start"
                  sx={{
                    "& .MuiRadio-root": {
                      color: "#fff",
                    },
                  }}
                />
              ))}
            </RadioGroup>
            <Button
              onClick={() => handleSubmit()}
              className="mt-4 w-full"
              title="Apply"
              isLoading={isLoading}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PromotionDialog;
