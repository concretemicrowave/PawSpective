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
        console.log("response", response.data.user.posts);

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

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
