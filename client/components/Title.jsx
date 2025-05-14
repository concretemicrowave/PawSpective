import { SafeAreaView, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedComponents";

export default function Title({ text }) {
  return (
    <SafeAreaView style={styles.title}>
      <ThemedText style={styles.text}>{text}</ThemedText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    position: "absolute",
    zIndex: 10000,
    width: "100%",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },
});
