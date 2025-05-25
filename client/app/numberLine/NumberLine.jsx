import { useRef, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { ThemedView, ThemedText } from "../../components/ThemedComponents";
import { useWeightGoal } from "../../context/WeightGoalContext";
import { BackLink } from "../../components/BackLink";
import Title from "../../components/Title";

const ITEM_WIDTH = 60;
const SCREEN_WIDTH = Dimensions.get("window").width;
const DEFAULT_WEIGHT = 55;

export default function NumberLine() {
  const scrollRef = useRef(null);
  const weightGoalContext = useWeightGoal();
  const currentWeight = weightGoalContext?.weightGoal ?? DEFAULT_WEIGHT;

  const numbers = Array.from({ length: 201 }, (_, i) => i);
  const initialIndex = numbers.findIndex((n) => n === currentWeight);
  const visualCenterOffset = SCREEN_WIDTH * 0.5 - ITEM_WIDTH / 2;
  const initialOffset = initialIndex * ITEM_WIDTH - visualCenterOffset;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ x: initialOffset, animated: false });
    }
  }, []);

  return (
    <ThemedView style={styles.container}>
      <BackLink />
      <SafeAreaView>
        <View style={styles.header}>
          <Title color="black" text="Add Goal" />
        </View>
      </SafeAreaView>

      <View style={[styles.indicator, { left: SCREEN_WIDTH * 0.5 - 1 }]} />

      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingHorizontal: visualCenterOffset },
        ]}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        snapToAlignment="start"
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
  container: {
    flex: 1,
  },
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
  scrollContainer: {
    alignItems: "center",
  },
  item: {
    width: ITEM_WIDTH,
    alignItems: "center",
  },
  number: {
    fontSize: 20,
    color: "#555",
  },
  currentNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  label: {
    fontSize: 12,
    color: "#aaa",
    marginBottom: 4,
  },
  currentLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000",
  },
});
