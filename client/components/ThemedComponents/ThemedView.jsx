import { View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export function ThemedView({
  style,
  secondary,
  lightColor,
  darkColor,
  ...otherProps
}) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    secondary ? "backgroundSecondary" : "background",
  );

  return <View style={{ backgroundColor, ...style }} {...otherProps} />;
}
