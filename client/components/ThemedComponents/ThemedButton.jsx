import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";
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
  text = "white",
  disabled = false,
  loading = false,
  padding = true,
  leftIcon,
  rightIcon,
  ...rest
}) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    `${color}`,
  );

  const isDisabled = disabled || loading;
  const spinnerColor = hollow ? backgroundColor : "#fff";

  return (
    <TouchableOpacity
      style={[
        padding && styles.padding,
        styles.button,
        { backgroundColor },
        isDisabled && styles.disabled,
        { borderRadius },
        hollow && {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: backgroundColor,
        },
        style,
      ]}
      activeOpacity={0.6}
      disabled={isDisabled}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="small" color={spinnerColor} />
      ) : (
        <View style={styles.content}>
          {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
          <ThemedText
            type="subtitle"
            style={styles.text}
            color={hollow && text === "white" ? color : text}
          >
            {title}
          </ThemedText>
          {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  padding: {
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 6,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
  },
});
