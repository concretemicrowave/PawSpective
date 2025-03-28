import { createContext, useContext, useState } from "react";

const PhotoContext = createContext();

export const PhotoProvider = ({ children }) => {
  const [photoUri, setPhotoUri] = useState(null);

  return (
    <PhotoContext.Provider value={{ photoUri, setPhotoUri }}>
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhoto = () => useContext(PhotoContext);
