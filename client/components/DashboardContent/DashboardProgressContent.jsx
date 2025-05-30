import { View, StyleSheet } from "react-native";
import DashboardData from "./DashboardData";

export default function DashboardProgressContent({ history }) {
  return (
    <View style={styles.content}>
      <DashboardData history={history} />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    width: "90%",
    marginHorizontal: 20,
    minHeight: 350,
  },
});
