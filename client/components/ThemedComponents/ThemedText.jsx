import { Text, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={{
        color,
        ...(type === "default" && styles.default),
        ...(type === "title" && styles.title),
        ...(type === "subtitle" && styles.subtitle),
        ...(type === "link" && styles.link),
        ...style,
      }}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "MontserratMedium",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
    fontFamily: "MontserratBold",
  },
  subtitle: {
    fontSize: 24,
    fontFamily: "MontserratSemiBold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
    fontFamily: "MontserratMedium",
  },
});
