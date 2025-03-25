import { ThemedView, ThemedText } from "./ThemedComponents";
import { StyleSheet } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";

export default function Chip({
  label,
  color = "primary",
  lightColor,
  darkColor,
  style,
  hollow = false,
}) {
  const borderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    `${color}`,
  );
  return (
    <ThemedView
      color={color}
      style={[
        styles.container,
        hollow && {
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: borderColor,
        },
        style,
      ]}
    >
      <ThemedText color={hollow ? color : ""} style={styles.text}>
        {label}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    borderRadius: 50,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 16,
  },
});
