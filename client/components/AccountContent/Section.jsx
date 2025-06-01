import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedComponents";
import OptionRow from "./OptionRow";

export default function Section({ title, items, variant = "default" }) {
  return (
    <>
      <ThemedText style={styles.sectionLabel}>{title}</ThemedText>
      <View
        style={[styles.optionsContainer, variant === "danger" && styles.danger]}
      >
        {items.map((item, index) => (
          <OptionRow
            key={item.label}
            label={item.label}
            onPress={item.onPress}
            attention={item.attention}
            noBorder={index === items.length - 1}
          />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  sectionLabel: {
    fontSize: 13,
    fontWeight: "bold",
    opacity: 0.8,
    marginBottom: 4,
    marginTop: 8,
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  optionsContainer: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    overflow: "hidden",
    marginBottom: 12,
  },
  danger: {
    backgroundColor: "#ffebeb",
    borderColor: "#d32f2f",
  },
});
