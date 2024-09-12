import React, { useContext, useRef, useState } from "react";
import Button from "../../Utils/Button";
import Divider from "../../Utils/Divider";
import { Link } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import Utils from "../../Utils/Utils";

const SignupForm = (props) => {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const [isLoading, setLoading] = useState(false);

  const authContext = useContext(AuthContext);

  const submitHandler = async (e) => {
    if (isLoading) {
      return;
    }
    setLoading(true);
    if (
      nameRef.current.value.length < 4 &&
      emailRef.current.value.length < 4 &&
      passwordRef.current.value.length < 4 &&
      confirmPasswordRef.current.value.length < 4
    ) {
      alert("Email and Password should be atleast 4 characters long");
    } else {
      if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        alert("Passwords do not match");
        return;
      }

      const response = await authContext.register({
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      if (response === true) {
        props.onClose();
      }
    }
    setLoading(false);
  };

  return (
    <form className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-white">Sign Up</h1>
      <Divider className="my-1" />
      <div
        style={{ backgroundColor: Utils.color.white }}
        className="w-full rounded-full border border-gray-300 px-4 py-2 w-1/2 flex items-center gap-2"
      >
        <input
          ref={nameRef}
          type="text"
          style={{ backgroundColor: Utils.color.white }}
          className="border-0 border-gray-500 outline-0 w-full"
          placeholder="Full Name"
        />
      </div>
      <div
        style={{ backgroundColor: Utils.color.white }}
        className="w-full rounded-full border border-gray-300 px-4 py-2 w-1/2 flex items-center gap-2"
      >
        <input
          ref={emailRef}
          style={{ backgroundColor: Utils.color.white }}
          type="email"
          className="border-0 border-gray-500 outline-0 w-full"
          placeholder="Email"
        />
      </div>
      <div
        style={{ backgroundColor: Utils.color.white }}
        className="w-full rounded-full border border-gray-300 px-4 py-2 w-1/2 flex items-center gap-2"
      >
        <input
          style={{ backgroundColor: Utils.color.white }}
          ref={passwordRef}
          type="password"
          className="border-0 border-gray-500 outline-0 w-full"
          placeholder="Password"
        />
      </div>
      <div
        style={{ backgroundColor: Utils.color.white }}
        className="w-full rounded-full border border-gray-300 px-4 py-2 w-1/2 flex items-center gap-2"
      >
        <input
          style={{ backgroundColor: Utils.color.white }}
          ref={confirmPasswordRef}
          type="password"
          className="border-0 outline-0 w-full"
          placeholder="Re-Enter Password"
        />
      </div>

      <div className="flex justify-center items-center">
        <p className="text-sm text-white">Already have an account ?</p>
        <div
          onClick={props.onSignUp}
          className="ml-1 text-blue-500 cursor-pointer"
        >
          Sign In
        </div>
      </div>
      <Button isLoading={isLoading} onClick={submitHandler} title="Sign Up" />
    </form>
  );
};

export default SignupForm;
