import { StyleSheet, View } from "react-native";
import {
  ThemedView,
  ThemedText,
  ThemedInput,
  ThemedNumberInput,
} from "../../components/ThemedComponents";
import { DetailCards } from "../../components/DetailCards/DetailCards";
import { useState } from "react";

export default function Details() {
  const [weight, setWeight] = useState(0);
  const [age, setAge] = useState(0);
  const [symptoms, setSymptoms] = useState("");

  return (
    <>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>* Insert Breed</ThemedText>
        <View style={styles.inputContainer}>
          <ThemedNumberInput
            value={weight}
            setValue={setWeight}
            style={styles.numberInput}
            label="kg"
          />
          <ThemedNumberInput
            value={age}
            setValue={setAge}
            style={styles.numberInput}
            label="age(mos.)"
          />
        </View>
        <ThemedInput value={""} placeholder="Pet Name" />
        <ThemedInput
          value={symptoms}
          placeholder="Symptoms"
          onChangeText={setSymptoms}
        />
        <DetailCards
          weight={weight}
          age={age}
          symptoms={symptoms === "" ? "None" : symptoms}
        />
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
    height: "68%",
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  numberInput: {
    flex: 1,
    transform: [{ translateY: -4 }],
  },
});
