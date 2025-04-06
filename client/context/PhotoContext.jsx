import { createContext, useContext, useState } from "react";

const PhotoContext = createContext();

export const PhotoProvider = ({ children }) => {
  const [photoUri, setPhotoUri] = useState(null);
  const [update, setUpdate] = useState(false);

  return (
    <PhotoContext.Provider value={{ photoUri, setPhotoUri, update, setUpdate }}>
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhoto = () => useContext(PhotoContext);
