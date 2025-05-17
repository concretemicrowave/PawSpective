import { StyleSheet, View } from "react-native";
import { DetailCard } from "./DetailCard";

export function DetailCards({ weight, age, symptoms, avgWeight, avgLifespan }) {
  console.log(avgWeight, avgLifespan);
  return (
    <View style={styles.cards}>
      <DetailCard title="Symptoms" bold={symptoms} />
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
