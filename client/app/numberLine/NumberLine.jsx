import { useRef, useEffect, useState, useMemo } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import {
  ThemedView,
  ThemedText,
  ThemedButton,
} from "../../components/ThemedComponents";
import { BackLink } from "../../components/BackLink";
import Title from "../../components/Title";
import * as Haptics from "expo-haptics";
import { useWeightGoal } from "../../context/WeightGoalContext";
import { useRouter } from "expo-router";

const ITEM_WIDTH = 60;
const SCREEN_WIDTH = Dimensions.get("window").width;
const MAX_KG = 200;
const KG_TO_LB = 2.20462;

export default function NumberLine() {
  const { params } = useRoute();
  const scrollRef = useRef(null);
  const router = useRouter();
  const { setWeightGoal } = useWeightGoal();

  const { initialWeight } = params || {};
  const currentKg =
    typeof initialWeight === "string"
      ? parseInt(initialWeight, 10)
      : typeof initialWeight === "number"
        ? initialWeight
        : 0;

  const [unit, setUnit] = useState("kg");

  const numbers = useMemo(() => {
    if (unit === "kg") {
      return Array.from({ length: MAX_KG + 1 }, (_, i) => i);
    } else {
      const maxLb = Math.round(MAX_KG * KG_TO_LB);
      return Array.from({ length: maxLb + 1 }, (_, i) => i);
    }
  }, [unit]);

  const initialIndex = useMemo(() => {
    if (unit === "kg") {
      return numbers.indexOf(currentKg);
    } else {
      const currentLb = Math.round(currentKg * KG_TO_LB);
      return numbers.indexOf(currentLb);
    }
  }, [unit, numbers, currentKg]);

  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  useEffect(() => {
    if (scrollRef.current && initialIndex >= 0) {
      scrollRef.current.scrollTo({
        x: initialIndex * ITEM_WIDTH,
        animated: false,
      });
      setSelectedIndex(initialIndex);
      const newKg =
        unit === "kg"
          ? numbers[initialIndex]
          : Math.round(numbers[initialIndex] / KG_TO_LB);
      setWeightGoal(newKg);
    }
  }, [initialIndex, unit, numbers, setWeightGoal]);

  const handleSnap = (e) => {
    const x =
      e.nativeEvent.contentOffset.x + (SCREEN_WIDTH * 0.5 - ITEM_WIDTH / 2);
    const idx = Math.round(x / ITEM_WIDTH);
    if (idx !== selectedIndex && numbers[idx] != null) {
      Haptics.notificationAsync();
      setSelectedIndex(idx - 3);
      const newKg =
        unit === "kg" ? numbers[idx] : Math.round(numbers[idx] / KG_TO_LB);
      setWeightGoal(newKg - 3);
    }
  };

  const onDone = () => router.back();

  return (
    <ThemedView style={styles.container}>
      <BackLink />
      <SafeAreaView>
        <View style={styles.header}>
          <Title color="black" text="Weight Goal" />
        </View>
      </SafeAreaView>
      <View style={styles.unitSwitcher}>
        <TouchableOpacity
          style={[styles.unitButton, unit === "kg" && styles.unitButtonActive]}
          onPress={() => setUnit("kg")}
        >
          <ThemedText
            {...(unit === "kg" && { type: "subtitle" })}
            style={unit === "kg" ? styles.unitTextActive : styles.unitText}
          >
            kg
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.unitButton, unit === "lb" && styles.unitButtonActive]}
          onPress={() => setUnit("lb")}
        >
          <ThemedText
            {...(unit === "lb" && { type: "subtitle" })}
            style={unit === "lb" ? styles.unitTextActive : styles.unitText}
          >
            lb
          </ThemedText>
        </TouchableOpacity>
      </View>
      <View style={[styles.indicator, { left: SCREEN_WIDTH * 0.5 - 1 }]} />
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          paddingHorizontal: SCREEN_WIDTH * 0.5 - ITEM_WIDTH / 2,
        }}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        snapToAlignment="start"
        onMomentumScrollEnd={handleSnap}
      >
        {numbers.map((number, i) => {
          const isCurrent = i === selectedIndex;
          const base =
            unit === "kg" ? currentKg : Math.round(currentKg * KG_TO_LB);
          const diff = number - base;
          const label =
            diff === 0 ? "" : `${diff > 0 ? "+" : ""}${diff}${unit}`;
          return (
            <View key={i} style={styles.item}>
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
      <View style={styles.footer}>
        <ThemedButton title="Done" onPress={onDone} borderRadius={50} />
      </View>
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
  unitSwitcher: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 46,
  },
  unitButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  unitButtonActive: {
    backgroundColor: "#ddd",
  },
  unitText: {
    fontSize: 16,
    opacity: 0.6,
  },
  unitTextActive: {
    fontSize: 16,
    opacity: 1,
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
  footer: {
    padding: 26,
    paddingBottom: 30,
  },
});
