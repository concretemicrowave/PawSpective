import {
  ThemedView,
  ThemedInput,
  ThemedButton,
} from "@/components/ThemedComponents";
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
