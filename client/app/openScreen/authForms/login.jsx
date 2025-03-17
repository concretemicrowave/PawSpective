import { ThemedView } from "@/components/ThemedView";
import { ThemedInput } from "@/components/ThemedInput";
import { ThemedButton } from "@/components/ThemedButton";
import { StyleSheet } from "react-native";

export default function Login() {
  return (
    <ThemedView style={styles.inputContainer}>
      <ThemedInput required style={styles.input} placeholder="Email" />
      <ThemedInput required style={styles.input} placeholder="Password" />
      <ThemedButton color="primary" title="Login" />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginTop: 12,
  },
  input: {
    width: "100%",
  },
});
