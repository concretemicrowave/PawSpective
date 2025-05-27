import { View, StyleSheet } from "react-native";
import {
  ThemedInput,
  ThemedNumberInput,
} from "../../../components/ThemedComponents";
import { DetailCards } from "../../../components/DetailCards/DetailCards";

export default function PetForm({
  name,
  setName,
  weight,
  setWeight,
  age,
  setAge,
  symptoms,
  setSymptoms,
  averageHealthyWeight,
  averageLifespan,
}) {
  return (
    <>
      <ThemedInput
        value={name}
        onChangeText={setName}
        placeholder="Pet Name"
        style={{ marginBottom: 12 }}
      />
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
          label="age"
        />
      </View>
      <DetailCards
        weight={weight}
        age={age}
        symptoms={symptoms || "None"}
        setSymptoms={setSymptoms}
        avgWeight={averageHealthyWeight}
        avgLifespan={averageLifespan}
      />
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  numberInput: {
    flex: 1,
  },
});
