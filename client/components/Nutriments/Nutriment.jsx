import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedComponents";

export function Nutriment({
  icon,
  color,
  label,
  unitKey,
  nutriments,
  nutrimentKey,
}) {
  return (
    <View key={nutrimentKey} style={styles.nutriment}>
      <FontAwesomeIcon icon={icon} size={24} color={color} />
      <ThemedText>
        <ThemedText type="subtitle" style={styles.boldText}>
          {nutriments[nutrimentKey]}
        </ThemedText>{" "}
        {label}
        {unitKey && ` (${nutriments[unitKey]})`}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  nutriment: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 6,
  },
  boldText: {
    fontSize: 16,
  },
});
