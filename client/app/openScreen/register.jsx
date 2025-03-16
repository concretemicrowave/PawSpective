import { StyleSheet } from "react-native";
import { ThemedView } from "../../components/ThemedView";

export default function Register() {
  return (
    <ThemedView style={styles.container}>
      {/* Your component content here */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
