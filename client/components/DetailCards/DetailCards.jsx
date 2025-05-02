import { StyleSheet, View } from "react-native";
import { DetailCard } from "./DetailCard";

export function DetailCards({ weight, age, symptoms }) {
  return (
    <View style={styles.cards}>
      <DetailCard title="Symptoms" bold={symptoms} />
      <View style={{ flexDirection: "row", gap: 8 }}>
        <DetailCard
          title="Weight"
          bold={`${weight} kg`}
          progress={weight}
          average={50}
          style={{ flex: 1 }}
        />
        <DetailCard
          title="Age"
          bold={`${age} years`}
          progress={age}
          average={20}
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
