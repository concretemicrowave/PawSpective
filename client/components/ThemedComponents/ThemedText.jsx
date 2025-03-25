import { Text, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  color = "text",
  ...rest
}) {
  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    `${color}`,
  );

  return (
    <Text
      style={{
        color: textColor,
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
    fontSize: 16,
    color: "#0a7ea4",
    fontFamily: "MontserratMedium",
  },
});
