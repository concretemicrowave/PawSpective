import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { getUser } = useAuth();
  const [userData, setUserData] = useState({
    userId: null,
    name: "",
    email: "",
    posts: [],
  });

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setUserData({ ...userData, userId: user.user.userId });
      setUserData({ ...userData, name: user.user.name });
      setUserData({ ...userData, email: user.user.email });
      setUserData({ ...userData, posts: user.user.posts });
    };
    fetchUser();
  }, [getUser]);

  const updateUser = (newData) => {
    setUserData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <UserContext.Provider value={{ userData, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
