import { StyleSheet, View } from "react-native";
import {
  ThemedView,
  ThemedText,
  ThemedInput,
  ThemedNumberInput,
} from "../../components/ThemedComponents";

export default function Details() {
  return (
    <>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>* Insert Breed</ThemedText>
        <View style={styles.inputContainer}>
          <ThemedInput style={styles.input} placeholder="Pet Name" />
          <ThemedNumberInput style={styles.weight} label="kg(s)" />
        </View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "64%",
    borderRadius: 20,
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  input: {
    width: "50%",
  },
  weight: {
    width: "auto",
    transform: [{ translateY: -4 }],
  },
});
