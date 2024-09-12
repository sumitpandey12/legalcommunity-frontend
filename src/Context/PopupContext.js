import React, { createContext } from "react";

const PopupContext = createContext({
  loginShow: false,
  toggleLogin: (value) => {},
});

const PopupProvider = (props) => {
  const [loginShow, setLoginShow] = React.useState(false);

  const toggleLogin = (value) => setLoginShow(value);

  const value = { loginShow, toggleLogin };

  return (
    <PopupContext.Provider value={value}>
      {props.children}
    </PopupContext.Provider>
  );
};

export { PopupProvider, PopupContext };
