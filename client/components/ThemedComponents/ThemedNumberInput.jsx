import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

export function ThemedNumberInput({ label, initialValue = 0, style, ...rest }) {
  const [value, setValue] = useState(initialValue);

  const increaseValue = () => setValue((prev) => prev + 1);
  const decreaseValue = () => setValue((prev) => Math.max(0, prev - 1));

  return (
    <ThemedView style={[styles.container, style]} {...rest}>
      <TouchableOpacity style={styles.button} onPress={decreaseValue}>
        <Text style={styles.buttonText}>−</Text>
      </TouchableOpacity>
      <View style={styles.valueContainer}>
        <ThemedText style={styles.value}>{value}</ThemedText>
        <ThemedText style={styles.label}>{label}</ThemedText>
      </View>
      <TouchableOpacity style={styles.button} onPress={increaseValue}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "space-between",
  },
  button: {
    width: 40,
    height: 40,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",
    fontWeight: 400,
    transform: [{ translateY: -2 }],
  },
  valueContainer: {
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    opacity: 0.5,
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
