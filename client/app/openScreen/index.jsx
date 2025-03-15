import { ThemedView } from "../../components/ThemedView";
import { ThemedText } from "../../components/ThemedText";
import { ThemedInput } from "../../components/ThemedInput";
import { ThemedButton } from "../../components/ThemedButton";
import { StyleSheet } from "react-native";

export default function openScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">Not Logged In?</ThemedText>
      <ThemedView style={styles.inputContainer}>
        <ThemedInput required style={styles.input} placeholder="Email" />
        <ThemedInput required style={styles.input} placeholder="Password" />
        <ThemedButton color="primary" title="Login" />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    textAlign: "left",
    paddingBottom: 20,
    padding: 30,
  },
  inputContainer: {
    width: "100%",
    marginTop: 12,
  },
  input: {
    width: "100%",
  },
});
