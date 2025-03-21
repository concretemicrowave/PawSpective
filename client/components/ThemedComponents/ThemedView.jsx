import { View, ScrollView } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export function ThemedView({
  style,
  secondary,
  lightColor,
  darkColor,
  scrollable,
  ...otherProps
}) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    secondary ? "backgroundSecondary" : "background",
  );

  return scrollable ? (
    <ScrollView style={{ backgroundColor, ...style }} {...otherProps} />
  ) : (
    <View style={{ backgroundColor, ...style }} {...otherProps} />
  );
}
