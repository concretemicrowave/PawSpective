import { Modal, StyleSheet, View, TouchableOpacity } from "react-native";
import { ThemedButton, ThemedText, ThemedView } from "./ThemedComponents";

export function Popup({ title, children, onClose }) {
  return (
    <Modal transparent animationType="fade" visible onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <ThemedView style={styles.container}>
          <View style={styles.header}>
            <ThemedText type="subtitle" style={styles.title}>
              {title}
            </ThemedText>
          </View>
          <View style={styles.content}>
            {children}
            <ThemedButton onPress={onClose} title="Close" />
          </View>
        </ThemedView>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#18181B",
    borderRadius: 16,
    shadowColor: "#404040",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "80%",
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
  },
  content: {
    padding: 12,
    paddingTop: 0,
  },
});
