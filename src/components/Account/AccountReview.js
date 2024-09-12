import { Rating } from "@mui/material";
import React, { useEffect } from "react";
import Divider from "../../Utils/Divider";
import UserContoller from "../../APIs/UserController";
import AuthContext from "../../Context/AuthContext";

const AccountReview = ({ id }) => {
  const userController = new UserContoller();
  const [reviews, setReviews] = React.useState([]);

  useEffect(() => {
    getAllReviews();
  }, []);

  const getAllReviews = async () => {
    const res = await userController.getAllReviews({
      user_id: id,
    });
    console.log("Reviews", res.data);
    setReviews(res.data);
  };

  return (
    <div className="w-full flex flex-col gap-4 items-start">
      {reviews && reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full w-full">
          <p className="text-white">No reviews found</p>
        </div>
      ) : (
        reviews &&
        reviews.map((review, index) => {
          return <AccountReviewItem key={index} {...review} />;
        })
      )}
    </div>
  );
};

function AccountReviewItem({
  id,
  name,
  profile,
  created_at,
  rating,
  reviews,
  user_id,
}) {
  const newDate = new Date(created_at).toDateString();
  return (
    <div className="flex w-1/2 flex-col gap-4 p-4">
      <div className="flex justify justify-between">
        <div className="flex gap-2">
          <div className="w-7 h-7 text-center rounded-full bg-red-500">J</div>
          <span className="text-white">{name}</span>
        </div>
        <Rating name="no-value" value={+rating} />
      </div>
      <div className="text-white text-start">{reviews}</div>
      <div className="flex justify-between">
        <span className="text-white">{newDate}</span>
      </div>
      <Divider className={"my-1"} />
    </div>
  );
}

export default AccountReview;
