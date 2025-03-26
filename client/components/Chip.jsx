import { ThemedView, ThemedText } from "./ThemedComponents";
import { StyleSheet } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export function Chip({
  label,
  color = "primary",
  lightColor,
  darkColor,
  style,
  icon,
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
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          size={16}
          color={hollow ? borderColor : ""}
        />
      )}
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
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  text: {
    fontSize: 16,
  },
});
