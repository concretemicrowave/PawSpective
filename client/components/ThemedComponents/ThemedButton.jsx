import { TouchableOpacity, StyleSheet } from "react-native";
import { useThemeColor } from "../../hooks/useThemeColor";
import { ThemedText } from "./ThemedText";

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
      <ThemedText style={styles.text} color={hollow ? color : "white"}>
        {title}
      </ThemedText>
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
  },
});
