import React, { useContext, useRef } from "react";
import Modal from "../../Utils/Modal";
import Button from "../../Utils/Button";
import Card from "../../Utils/Card";
import UserContoller from "../../APIs/UserController";
import AuthContext from "../../Context/AuthContext";

const AddLibrary = (props) => {
  const [show, setShow] = React.useState(false);

  const userController = new UserContoller();
  const authContext = useContext(AuthContext);

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const [isLoading, setLoading] = React.useState(false);

  const postQueryHandler = async () => {
    if (isLoading) {
      return;
    }
    setLoading(true);
    if (titleRef.current.value.length < 5) {
      alert("Title should be atleast 5 characters long");
      return;
    }

    if (descriptionRef.current.value.length < 5) {
      alert("Description should be atleast 5 characters long");
      return;
    }

    const response = await userController.postMyCases({
      title: titleRef.current.value,
      category_id: 1,
      data: descriptionRef.current.value,
    });
    console.log(response);
    setLoading(false);
  };

  if (authContext.user == null || authContext.user.user_type != "Lawyer") {
    return null;
  }

  return (
    <Card className="flex flex-col gap-4 w-full">
      <select className="border rounded-lg border-gray-300 bg-white px-4 py-2 w-full">
        {props.category.map((item) => (
          <option key={item.id} value={item.id}>
            {item.category}
          </option>
        ))}
      </select>
      <div className="bg-white rounded-full border border-gray-300 px-4 py-2 w-full flex items-center gap-2">
        <input
          ref={titleRef}
          type="text"
          className="border-0 outline-0 w-full"
          placeholder="Enter Title"
        />
      </div>

      <textarea
        ref={descriptionRef}
        className="border rounded-lg border-gray-300 px-4 py-2 w-full"
        placeholder="Enter Description"
      />
      <Button isLoading={isLoading} title="Post" onClick={postQueryHandler} />
    </Card>
  );
};

export default AddLibrary;
