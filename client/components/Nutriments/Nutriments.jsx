import { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { ThemedText } from "../ThemedComponents";
import { useThemeColor } from "../../hooks/useThemeColor";
import { useIcons } from "../../utils/NutrimentICONS";
import { Nutriment } from "./Nutriment";
import { Popup } from "../Popup";

export function Nutriments({ lightColor, darkColor, nutriments }) {
  const [expanded, setExpanded] = useState(false);
  const borderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "border",
  );
  const ICONS = useIcons();

  return (
    <View
      style={[
        styles.container,
        { borderColor, backgroundColor: "rgba(255, 255, 255, 0.1)" },
      ]}
    >
      {ICONS.slice(0, 3).map(({ icon, color, key, label, unitKey }) => (
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
      <TouchableOpacity onPress={() => setExpanded(true)} style={styles.button}>
        <ThemedText style={styles.buttonText}>View All</ThemedText>
      </TouchableOpacity>
      {expanded && (
        <Popup title={"Nutriments"} onClose={() => setExpanded(false)}>
          {ICONS.map(({ icon, color, key, label, unitKey }) => (
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
        </Popup>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
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
