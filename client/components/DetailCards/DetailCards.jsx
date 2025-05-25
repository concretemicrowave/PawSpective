import { StyleSheet, View } from "react-native";
import { DetailCard } from "./DetailCard";
import { useState } from "react";

export function DetailCards({
  weight,
  age,
  symptoms,
  setSymptoms,
  avgWeight,
  avgLifespan,
}) {
  const [editing, setEditing] = useState(false);

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
      <View style={{ flexDirection: "row", gap: 8 }}>
        <DetailCard
          title="Weight"
          bold={`${weight} kg`}
          progress={weight}
          average={avgWeight}
          style={{ flex: 1 }}
        />
        <DetailCard
          title="Age"
          bold={age}
          progress={age}
          average={avgLifespan}
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cards: {
    gap: 8,
  },
});
