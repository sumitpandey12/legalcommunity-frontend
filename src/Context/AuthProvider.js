import React, { useEffect } from "react";
import AuthContext from "./AuthContext";
import APIURLs from "../APIs/APIUrls";
import AuthController from "../APIs/AuthController";
import { useNavigate } from "react-router-dom";
import UserContoller from "../APIs/UserController";

const AuthProvider = (props) => {
  const authController = new AuthController();
  const userController = new UserContoller();
  const [isLogined, setIsLogined] = React.useState(false);
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  useEffect(() => {
    if (user !== null) {
      setIsLogined(true);
    } else {
      setIsLogined(false);
    }
  }, [user]);

  const login = async (user) => {
    const response = await authController.login(user);
    if (response !== false) {
      setUser(response);
      localStorage.setItem("user", JSON.stringify(response));
      localStorage.setItem("token", response.token);
      setIsLogined(true);
      window.location.reload();
      return true;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const getProfile = async () => {
    console.log("Getting profile...");
    const response = await userController.getUserProfile();
    if (response) {
      console.log("setting responses", response);
      setUser(response);
      localStorage.setItem("user", JSON.stringify(response));
    }
  };

  const registerHandler = async (user) => {
    try {
      const response = await authController.register(user);
      if (response) {
        login(user);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const updateProfileHandler = async (user) => {
    console.log("user", user);
    const response = await userController.updateProfile(user);
    if (response) {
      return true;
    }
    getProfile();
  };

  const initData = {
    user: user,
    login: login,
    logout: logout,
    register: registerHandler,
    updateProfile: updateProfileHandler,
    isLawyer: () => {
      return user.user_type === "Lawyer";
    },
    isLogined: isLogined,
  };

  return (
    <AuthContext.Provider value={initData}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
