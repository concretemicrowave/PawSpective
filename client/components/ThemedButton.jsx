import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";

export function ThemedButton({
  style,
  lightColor,
  darkColor,
  title,
  borderRadius = 12,
  hollow = false,
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
        { borderRadius },
        hollow
          ? {
              backgroundColor: "transparent",
              borderWidth: 1,
              borderColor: backgroundColor,
            }
          : null,
      ]}
      activeOpacity={0.6}
      disabled={disabled}
      {...rest}
    >
      <Text
        style={[styles.text, { color: hollow ? backgroundColor : textColor }]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 10,
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
