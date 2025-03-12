import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "userToken";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      setIsLoggedIn(!!token);
    };

    checkAuthStatus();
  }, []);

  const login = async (token) => {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    setIsLoggedIn(false);
  };

  return { isLoggedIn, login, logout };
}
