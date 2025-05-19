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

  const [latestPostId, setLatestPostId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();

        if (response?.data) {
          const posts = response.data.user.posts || [];

          setUserData({
            userId: response.data.user.id,
            name: response.data.user.name,
            email: response.data.user.email,
            posts,
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

  useEffect(() => {
    const postKeys = Object.keys(userData.posts || {});
    if (postKeys.length > 0) {
      const latestId = String(Math.max(...postKeys.map(Number)));
      setLatestPostId(latestId);
    } else {
      setLatestPostId(null);
    }
  }, [userData.posts]);

  return (
    <UserContext.Provider value={{ userData, setUserData, latestPostId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
