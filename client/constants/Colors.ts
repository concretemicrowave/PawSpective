/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#f2f2f2",
    backgroundSecondary: "#f5f5f5",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    primary: "#A3D1FF",
    secondary: "#1B75BC",
    accent: "#FF6B35",
    grey: "#D1D5DB",
    border: "rgba(0, 0, 0, 0.2)",
    attention: "#d03533",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    backgroundSecondary: "#212121",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    primary: "#4682B4",
    secondary: "#0A5F85",
    accent: "#FF784F",
    grey: "#4B5563",
    border: "rgba(255, 255, 255, 0.2)",
    attention: "#d03533",
  },
};
