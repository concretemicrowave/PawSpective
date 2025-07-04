import { StyleSheet } from "react-native";
import { ThemedView } from "../../components/ThemedComponents";
import SaveButton from "./content/SaveButton";
import PredictionHandler from "./content/PredictionHandler";
import usePrediction from "@/utils/usePrediction";

export default function Details({ uri }) {
  const {
    predicting,
    breed,
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
    update,
    onSave,
    saving, // assume this is returned by usePrediction
  } = usePrediction(uri);

  return (
    <>
      <ThemedView scrollable style={styles.container}>
        <PredictionHandler
          predicting={predicting}
          breed={breed}
          name={name}
          setName={setName}
          weight={weight}
          setWeight={setWeight}
          age={age}
          setAge={setAge}
          symptoms={symptoms}
          setSymptoms={setSymptoms}
          averageHealthyWeight={averageHealthyWeight}
          averageLifespan={averageLifespan}
        />
      </ThemedView>
      {!predicting && (
        <SaveButton
          breed={breed}
          update={update}
          weight={weight}
          onPress={onSave}
          loading={saving} // this is the important line
        />
      )}
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
});
