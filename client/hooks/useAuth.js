import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "userToken";
const API_URL = "http://10.173.6.106:3000/api";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        const response = await fetch(`${API_URL}/auth-check`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setIsLoggedIn(data.success);
      }
    };

    checkAuthStatus();
  }, [isLoggedIn]);

  const getUser = async () => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    if (token) {
      const response = await fetch(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      return data;
    }
    return null;
  };

  const register = async (name, email, password) => {
    try {
      const response = await fetch(`${API_URL}/accounts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (data.success && data.data.token) {
        await SecureStore.setItemAsync(TOKEN_KEY, data.data.token);
        setIsLoggedIn(true);
        return data;
      } else {
        alert(data.message.message);
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/authenticate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success && data.data.token) {
        await SecureStore.setItemAsync(TOKEN_KEY, data.data.token);
        setIsLoggedIn(true);
        return data;
      } else {
        alert(data.message.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    setIsLoggedIn(false);
  };

  const savePost = async (post) => {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);

      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const response = await fetch(`${API_URL}/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(post),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save post");
      }

      return data;
    } catch (error) {
      console.error("Error saving the post:", error.message);
      throw error;
    }
  };

  const deletePost = async (postId) => {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      const cachedKey = `healthStatus_${postId}`;

      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const response = await fetch(`${API_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete post");
      }

      await AsyncStorage.removeItem(cachedKey);

      return data;
    } catch (error) {
      console.error("Error deleting the post:", error.message);
      throw error;
    }
  };

  const predictData = async (imageUri) => {
    try {
      const formData = new FormData();
      formData.append("image", {
        uri: imageUri,
        name: "image.jpg",
        type: "image/jpeg",
      });

      const response = await fetch(`${API_URL}/predict-breed`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Prediction error:", error);
      return null;
    }
  };

  return {
    isLoggedIn,
    login,
    register,
    logout,
    savePost,
    predictData,
    getUser,
    deletePost,
  };
}
