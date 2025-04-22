import { StyleSheet, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "../ThemedComponents";
import { Colors } from "../../constants/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function DashboardHeader() {
  const backgroundColor = Colors["light"].background;
  const backgroundGrey = Colors["light"].grey;

  return (
    <LinearGradient
      colors={[backgroundColor, backgroundGrey]}
      locations={[0.999, 0]}
      style={styles.header}
    >
      <SafeAreaView style={styles.container}>
        <MaterialCommunityIcons name="dog" size={36} color="black" />
        <ThemedText type="subtitle" style={styles.title}>
          PawSpective
        </ThemedText>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    transform: [{ translateY: 36 }],
  },
  header: {
    width: "100%",
    height: 400,
    padding: 20,
  },
  title: {
    fontSize: 28,
  },
});
