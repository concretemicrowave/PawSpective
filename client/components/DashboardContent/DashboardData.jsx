import { StyleSheet, View } from "react-native";
import { Graph } from "./Graph/Graph";

export default function DashboardData({ history }) {
  return (
    <>
      <View style={styles.container}>
        <Graph history={history} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
