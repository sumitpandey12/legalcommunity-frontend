import { createContext } from "react";

const AuthContext = createContext({
  user: null,
  login: (user) => {},
  logout: () => {},
  register: (user) => {},
  isLawyer: () => {},
  updateProfile: (user) => {},
  isLogined: null,
});

export default AuthContext;
