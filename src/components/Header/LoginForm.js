import React, { useContext, useRef } from "react";
import Button from "../../Utils/Button";
import Divider from "../../Utils/Divider";
import AuthContext from "../../Context/AuthContext";
import Utils from "../../Utils/Utils";

const LoginForm = (props) => {
  const email = useRef("");
  const password = useRef("");
  const [isLoading, setLoading] = React.useState(false);

  const authContext = useContext(AuthContext);

  const submitHandler = async (e) => {
    if (isLoading) {
      return;
    }
    if (email.current.value.length < 4 && password.current.value.length < 4) {
      alert("Email and Password should be atleast 4 characters long");
    }
    setLoading(true);
    const response = await authContext.login({
      email: email.current.value,
      password: password.current.value,
    });
    console.log("screen", response);

    if (response === true) {
      props.onClose();
    }

    setLoading(false);
  };

  return (
    <form className="flex flex-col gap-4 w-full">
      <h1 className="text-2xl font-bold text-white">Sign In</h1>
      <Divider className="my-1" />
      <div
        style={{ backgroundColor: Utils.color.white }}
        className="w-full rounded-full border border-gray-300 px-4 py-2 w-1/2 flex items-center gap-2"
      >
        <input
          ref={email}
          style={{ backgroundColor: Utils.color.white }}
          type="text"
          className="border-0 border-gray-500 outline-0 w-full"
          placeholder="Email"
        />
      </div>
      <div
        style={{ backgroundColor: Utils.color.white }}
        className="w-full rounded-full border border-gray-300 px-4 py-2 w-1/2 flex items-center gap-2"
      >
        <input
          ref={password}
          style={{ backgroundColor: Utils.color.white }}
          type="password"
          className="border-0 border-gray-500 outline-0 w-full"
          placeholder="Password"
        />
      </div>

      <div className="flex justify-center items-center">
        <p className="text-sm text-white">New on LegalAI ?</p>
        <div
          onClick={props.onSignUp}
          className="ml-1 text-blue-500 cursor-pointer"
        >
          Sign Up
        </div>
      </div>
      <Button isLoading={isLoading} onClick={submitHandler} title="Sign In" />
    </form>
  );
};

export default LoginForm;
