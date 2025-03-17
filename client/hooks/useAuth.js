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

  const login = async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/authenticate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data.success) {
        await SecureStore.setItemAsync(TOKEN_KEY, data.token);
        setIsLoggedIn(true);
      } else {
        alert(data.message);
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

  return { isLoggedIn, login, logout };
}
