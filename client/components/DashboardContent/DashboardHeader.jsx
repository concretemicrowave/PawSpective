import { StyleSheet, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "../ThemedComponents";
import { Colors } from "../../constants/Colors";

export default function DashboardHeader({ petCount }) {
  const backgroundColor = Colors["light"].background;
  const backgroundGrey = Colors["light"].grey;

  return (
    <LinearGradient
      colors={[backgroundColor, backgroundGrey]}
      locations={[0.999, 0]}
      style={styles.header}
    >
      <SafeAreaView style={styles.container}>
        <ThemedText type="subtitle" style={styles.title}>
          {petCount} pet(s)
        </ThemedText>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  header: {
    width: "100%",
    height: 300,
    padding: 20,
    alignItems: "center",
    flexDirection: "column",
  },
  title: {
    fontSize: 28,
    marginTop: 10,
  },
});
