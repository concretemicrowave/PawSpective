import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "userToken";
const API_URL = "http://192.168.86.43:3000/api";

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
  }, []);

  const register = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/accounts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success && data.data.token) {
        await SecureStore.setItemAsync(
          TOKEN_KEY,
          JSON.stringify(data.data.token),
        );
        setIsLoggedIn(true);
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
        await SecureStore.setItemAsync(
          TOKEN_KEY,
          JSON.stringify(data.data.token),
        );
        setIsLoggedIn(true);
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

      console.log("Post saved successfully:", data);
      return data;
    } catch (error) {
      console.error("Error saving the post:", error.message);
      throw error;
    }
  };

  return { isLoggedIn, login, register, logout, savePost };
}
