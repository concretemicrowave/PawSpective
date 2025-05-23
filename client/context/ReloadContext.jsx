import React, { createContext, useContext, useState, useCallback } from "react";

const ReloadContext = createContext();

export const ReloadProvider = ({ children }) => {
  const [shouldReload, setShouldReload] = useState(true);

  const triggerReload = useCallback(() => {
    setShouldReload(true);
  }, []);

  const acknowledgeReload = useCallback(() => {
    setShouldReload(false);
  }, []);

  return (
    <ReloadContext.Provider
      value={{ shouldReload, triggerReload, acknowledgeReload }}
    >
      {children}
    </ReloadContext.Provider>
  );
};

export const useReload = () => useContext(ReloadContext);
