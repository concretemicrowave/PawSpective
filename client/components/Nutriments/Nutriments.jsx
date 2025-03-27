import { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { ThemedText } from "../ThemedComponents";
import { useThemeColor } from "../../hooks/useThemeColor";
import { useIcons } from "../../utils/NutrimentICONS";
import { Nutriment } from "./Nutriment";

export function Nutriments({ lightColor, darkColor, nutriments }) {
  const [expanded, setExpanded] = useState(false);
  const borderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "border",
  );
  const ICONS = useIcons();

  const visibleItems = expanded ? ICONS : ICONS.slice(0, 3);

  return (
    <View
      style={[
        styles.container,
        { borderColor, backgroundColor: "rgba(255, 255, 255, 0.1)" },
      ]}
    >
      {visibleItems.map(({ icon, color, key, label, unitKey }) => (
        <Nutriment
          key={key}
          icon={icon}
          color={color}
          label={label}
          unitKey={unitKey}
          nutriments={nutriments}
          nutrimentKey={key}
        />
      ))}
      {!expanded && (
        <TouchableOpacity
          onPress={() => setExpanded(true)}
          style={styles.button}
        >
          <ThemedText style={styles.buttonText}>View All</ThemedText>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  button: {
    marginTop: "auto",
    alignItems: "center",
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
  },
});
