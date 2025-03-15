import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";

export function ThemedButton({
  style,
  lightColor,
  darkColor,
  title,
  color = "primary",
  disabled = false,
  ...rest
}) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    `${color}`,
  );
  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text",
  );

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor },
        disabled ? { opacity: 0.5 } : style,
      ]}
      activeOpacity={0.6}
      disabled={disabled}
      {...rest}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Montserrat",
  },
});
