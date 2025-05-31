import { StyleSheet, View } from "react-native";
import { Graph } from "./Graph/Graph";
import ProgressCircle from "../ProgressCircle";
import { useWeightGoal } from "../../context/WeightGoalContext";

export default function DashboardData({ history, avgWeight }) {
  const { weightGoal } = useWeightGoal();
  const weight = history[0]?.weight;
  const targetWeight = weightGoal != null ? weightGoal : avgWeight;
  const progressPercent = Math.round((weight / targetWeight) * 100);

  return (
    <View style={styles.container}>
      <ProgressCircle progress={progressPercent} target={targetWeight} />
      <Graph history={history} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 12,
    marginBottom: 36,
  },
});
