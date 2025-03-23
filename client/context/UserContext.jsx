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
      try {
        const response = await getUser();
        console.log(response);

        if (response?.data) {
          setUserData({
            userId: response.data.user.id,
            name: response.data.user.name,
            email: response.data.user.email,
            posts: response.data.user.posts || [],
          });
        } else {
          console.warn("No user data received.");
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

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
