import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView, ThemedText } from "./ThemedComponents";
import { useState } from "react";

export function Dropdown({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.6}
      >
        <ThemedText style={styles.title}>{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    borderRadius: 10,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.1)",
    backgroundColor: "transparent",
    width: 34,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    position: "absolute",
    top: 46,
    right: 8,
    borderRadius: 12,
    width: "50%",
    padding: 8,
    gap: 8,
    shadowColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    zIndex: 1000,
  },
});
