import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useThemeColor } from "../../hooks/useThemeColor";

export function ThemedButton({
  style,
  lightColor,
  darkColor,
  title,
  borderRadius = 12,
  hollow = false,
  color = "primary",
  disabled = false,
  padding = true,
  ...rest
}) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    `${color}`,
  );
  const textColor = hollow
    ? useThemeColor({ light: lightColor, dark: darkColor }, `${color}`)
    : useThemeColor({ light: lightColor, dark: darkColor }, "white");

  return (
    <TouchableOpacity
      style={[
        padding ? { paddingVertical: 14, paddingHorizontal: 10 } : null,
        styles.button,
        { backgroundColor },
        disabled ? { opacity: 0.5 } : null,
        { borderRadius },
        hollow
          ? {
              backgroundColor: "transparent",
              borderWidth: 1,
              borderColor: backgroundColor,
            }
          : null,
        style,
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
