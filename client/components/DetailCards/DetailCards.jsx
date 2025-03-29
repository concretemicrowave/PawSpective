import { StyleSheet, View } from "react-native";
import { DetailCard } from "./DetailCard";

export function DetailCards({ weight, age, symptoms }) {
  return (
    <View style={styles.cards}>
      <DetailCard title="Symptoms" bold={symptoms} />
      <View style={{ flexDirection: "row", gap: 8 }}>
        <DetailCard title="Weight(kg)" bold={weight} style={{ flex: 1 }} />
        <DetailCard title="Age(months)" bold={age} style={{ flex: 1 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cards: {
    gap: 8,
  },
});
