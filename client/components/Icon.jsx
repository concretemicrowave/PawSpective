import { StyleSheet, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useThemeColor } from "../hooks/useThemeColor";

export function Icon({
  icon,
  size,
  color = "primary",
  style,
  lightColor,
  darkColor,
  ...rest
}) {
  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "white",
  );
  const background = useThemeColor(
    { light: lightColor, dark: darkColor },
    color,
  );
  console.log(background);

  const shadowColor = "#000";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: background, shadowColor },
        style,
      ]}
      {...rest}
    >
      <FontAwesomeIcon icon={icon} size={size} color={textColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
