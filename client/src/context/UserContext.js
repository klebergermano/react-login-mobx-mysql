import React, { useState, createContext } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userStore, setUserStore] = useState({
    loading: true,
    isLoggedIn: true,
    username: "Fulanox de Talvinson",
  });

  const setUser = (userInfo) => {
    const newUserInfo = {
      loading: userInfo.loading,
      isLoggedIn: userInfo.isLoggedIn,
      username: userInfo.username,
    };

    setUserStore([...userStore, newUserInfo]);
  };

  return (
    <UserContext.Provider value={{ userStore, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
