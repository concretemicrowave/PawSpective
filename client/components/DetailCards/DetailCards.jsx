import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { DetailCard } from "./DetailCard";
import { useWeightGoal } from "../../context/WeightGoalContext";

export function DetailCards({
  weight,
  age,
  symptoms,
  setSymptoms,
  avgWeight,
  avgLifespan,
}) {
  const [editing, setEditing] = useState(false);

  const { weightGoal } = useWeightGoal();
  const targetWeight = weightGoal != null ? weightGoal : avgWeight;

  return (
    <View style={styles.cards}>
      <DetailCard
        title="Symptoms"
        bold={symptoms}
        editable
        isEditing={editing}
        onEditPress={() => setEditing((prev) => !prev)}
        onChangeText={setSymptoms}
      />
      <View style={styles.row}>
        <DetailCard
          title="Weight"
          bold={`${weight} kg`}
          progress={weight}
          average={targetWeight}
          style={styles.flex}
          type="Weight"
        />
        <DetailCard
          title="Age"
          bold={age}
          progress={age}
          average={avgLifespan}
          style={styles.flex}
          type="Age"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cards: {
    gap: 8,
  },
  row: {
    flexDirection: "row",
    gap: 8,
  },
  flex: {
    flex: 1,
  },
});
