import { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { ThemedView, ThemedText } from "../../components/ThemedComponents";
import { BackLink } from "../../components/BackLink";
import Title from "../../components/Title";
import * as Haptics from "expo-haptics";
import { useWeightGoal } from "../../context/WeightGoalContext";

const ITEM_WIDTH = 60;
const SCREEN_WIDTH = Dimensions.get("window").width;
const DEFAULT_WEIGHT = 0;

export default function NumberLine() {
  const { params } = useRoute();
  const scrollRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const { setWeightGoal } = useWeightGoal();

  const { initialWeight } = params ?? {};
  const currentWeight =
    typeof initialWeight === "string"
      ? parseInt(initialWeight, 10)
      : typeof initialWeight === "number"
        ? initialWeight
        : DEFAULT_WEIGHT;

  const numbers = Array.from({ length: 201 }, (_, i) => i);
  const initialIndex = numbers.indexOf(currentWeight);
  const offset = initialIndex * ITEM_WIDTH;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ x: offset, animated: false });
      setSelectedIndex(initialIndex);
      setWeightGoal(currentWeight);
    }
  }, [offset, initialIndex, currentWeight, setWeightGoal]);

  const handleSnap = (e) => {
    const x =
      e.nativeEvent.contentOffset.x + (SCREEN_WIDTH * 0.5 - ITEM_WIDTH / 2);
    const idx = Math.round(x / ITEM_WIDTH);

    if (idx !== selectedIndex) {
      Haptics.notificationAsync();
      setSelectedIndex(idx);
      setWeightGoal(numbers[idx] - 3);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <BackLink />
      <SafeAreaView>
        <View style={styles.header}>
          <Title color="black" text="Weight Goal" />
        </View>
      </SafeAreaView>

      {/* vertical indicator */}
      <View style={[styles.indicator, { left: SCREEN_WIDTH * 0.5 - 1 }]} />

      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContainer,
          {
            paddingHorizontal: SCREEN_WIDTH * 0.5 - ITEM_WIDTH / 2,
          },
        ]}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        snapToAlignment="start"
        onMomentumScrollEnd={handleSnap}
      >
        {numbers.map((number) => {
          const isCurrent = number === currentWeight;
          const diff = number - currentWeight;
          const label = diff === 0 ? "" : `${diff > 0 ? "+" : ""}${diff}kg`;

          return (
            <View key={number} style={styles.item}>
              <Text style={[styles.label, isCurrent && styles.currentLabel]}>
                {label}
              </Text>
              <ThemedText
                style={[styles.number, isCurrent && styles.currentNumber]}
              >
                {number}
              </ThemedText>
            </View>
          );
        })}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 8,
  },
  indicator: {
    position: "absolute",
    top: "50%",
    marginTop: -90,
    width: 2,
    height: 50,
    backgroundColor: "#888",
    zIndex: 1,
  },
  scrollContainer: { alignItems: "center" },
  item: { width: ITEM_WIDTH, alignItems: "center" },
  number: { fontSize: 20, color: "#555" },
  currentNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  label: { fontSize: 12, color: "#aaa", marginBottom: 4 },
  currentLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000",
  },
});
