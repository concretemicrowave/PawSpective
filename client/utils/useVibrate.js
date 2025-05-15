import { Vibration } from "react-native";

export const useVibrate = (length) => {
  const vibrate = () => {
    Vibration.vibrate(length);
  };

  return { vibrate };
};
