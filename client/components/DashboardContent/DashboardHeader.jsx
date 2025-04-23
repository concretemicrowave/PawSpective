import { StyleSheet, SafeAreaView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "../ThemedComponents";
import { Colors } from "../../constants/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import RadialBlob from "../../assets/svgs/RadialBlob";

export default function DashboardHeader() {
  const backgroundColor = Colors["light"].background;
  const backgroundGrey = Colors["light"].grey;
  const pastelOrange = "#FFD9A0";

  return (
    <View style={styles.header}>
      <LinearGradient
        colors={[backgroundColor, backgroundGrey]}
        locations={[0.999, 0]}
        style={StyleSheet.absoluteFill}
      />
      <RadialBlob />
      <SafeAreaView style={styles.container}>
        <MaterialCommunityIcons name="dog" size={36} color="black" />
        <ThemedText type="subtitle" style={styles.title}>
          PawSpective
        </ThemedText>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 400,
    padding: 20,
    position: "relative",
    overflow: "hidden",
  },
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    transform: [{ translateY: 36 }],
  },
  title: {
    fontSize: 28,
  },
  radialBlob: {
    position: "absolute",
    top: -80,
    right: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "#FFD9A0",
    opacity: 0.4,
    shadowColor: "#FFD9A0",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 80,
  },
});
