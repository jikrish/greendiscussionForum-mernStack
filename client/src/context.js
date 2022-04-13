import React, { useContext, useEffect, useState } from "react";
import data from "./data";
const url = "";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  //vars
  const [isLogin, setIsLogin] = useState(false);
  const [gusername, setGUsername] = useState();
  const [posts, setPosts] = useState(data); //change to obj
  // useEffect(() => {
  //   if (
  //     window.location.href.includes("register") ||
  //     window.location.href.includes("login")
  //   ) {
  //     setIsLogin(false);
  //   } else setIsLogin(true);
  // }, [window.location.href]);
  return (
    <AppContext.Provider
      value={{ isLogin, posts, setIsLogin, gusername, setGUsername }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
