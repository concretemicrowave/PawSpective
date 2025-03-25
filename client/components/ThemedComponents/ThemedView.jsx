import { View, ScrollView } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export function ThemedView({
  style,
  lightColor,
  darkColor,
  scrollable,
  secondary,
  ...otherProps
}) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    secondary ? "backgroundGrey" : "background",
  );

  return scrollable ? (
    <ScrollView style={{ backgroundColor, ...style }} {...otherProps} />
  ) : (
    <View style={{ backgroundColor, ...style }} {...otherProps} />
  );
}
