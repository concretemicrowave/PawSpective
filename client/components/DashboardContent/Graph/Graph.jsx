import {
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryTheme,
} from "victory-native";
import { View, Dimensions, StyleSheet } from "react-native";
import { useState } from "react";
import { ThemedText } from "../../ThemedComponents";
import { GraphToggle } from "./GraphToggle";

const screenWidth = Dimensions.get("window").width;

export function Graph({ history }) {
  const [showWeight, setShowWeight] = useState(true);

  if (!history || history.length === 0) return null;

  const labels = history.map((entry) => entry.timestamp.slice(5));
  const weights = history.map((entry) => entry.weight);
  const scores = history.map((entry) => entry.score);

  const latest = history[history.length - 1];
  const previous = history.length > 1 ? history[history.length - 2] : null;

  const weightChange = previous
    ? (latest.weight - previous.weight).toFixed(1)
    : null;
  const scoreChange = previous
    ? (latest.score - previous.score).toFixed(1)
    : null;
  const symptomsChange = previous
    ? latest.symptoms === previous.symptoms
      ? "No change"
      : `Changed from "${previous.symptoms}" to "${latest.symptoms}"`
    : null;

  const activeData = showWeight
    ? weights.map((y, i) => ({ x: labels[i], y }))
    : scores.map((y, i) => ({ x: labels[i], y }));

  return (
    <View style={styles.wrapper}>
      <GraphToggle isWeight={showWeight} setIsWeight={setShowWeight} />
      <VictoryChart
        domainPadding={{ x: 50 }}
        width={screenWidth * 0.95}
        theme={VictoryTheme.material}
        padding={{ top: 20, bottom: 50, left: 60, right: 60 }}
      >
        <VictoryAxis
          style={{
            tickLabels: { fontSize: 12, padding: 5 },
            axis: { stroke: "black" },
            grid: { stroke: "#e6e6e6" },
          }}
          tickFormat={labels}
        />
        <VictoryAxis
          dependentAxis
          style={{
            tickLabels: { fontSize: 12, padding: 5 },
            axis: { stroke: "black" },
            grid: { stroke: "#e6e6e6" },
          }}
        />
        <VictoryBar
          data={activeData}
          style={{
            data: {
              fill: showWeight ? "black" : "#17C964",
            },
          }}
          cornerRadius={{ top: 8 }}
          barWidth={32}
        />
      </VictoryChart>
      <View style={styles.progress}>
        <ThemedText style={styles.progressText}>
          {weightChange === null
            ? "No weight change"
            : `Weight Change: ${weightChange} kg`}
        </ThemedText>
        <ThemedText style={styles.progressText}>
          {scoreChange === null
            ? "No score change"
            : `Score Change: ${scoreChange}`}
        </ThemedText>
        <ThemedText style={styles.progressText}>
          {symptomsChange === null
            ? "No symptom change"
            : `Symptoms: ${symptomsChange}`}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
  },
  progress: {
    width: "100%",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  progressText: {
    fontSize: 16,
  },
});
