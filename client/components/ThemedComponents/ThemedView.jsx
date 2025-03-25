import { View, ScrollView } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export function ThemedView({
  style,
  lightColor,
  darkColor,
  scrollable,
  color,
  ...otherProps
}) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    color ? color : "background",
  );

  return scrollable ? (
    <ScrollView style={[{ backgroundColor }, style]} {...otherProps} />
  ) : (
    <View style={[{ backgroundColor }, style]} {...otherProps} />
  );
}
