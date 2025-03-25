import { StyleSheet, SafeAreaView, View } from "react-native";
import { Colors } from "../../../constants/Colors";
import { useColorScheme } from "react-native";
import { ThemedView, ThemedText } from "../../../components/ThemedComponents";
import DashboardContent from "../../../components/DashboardContent/DashboardContent";
import { useUser } from "../../../context/UserContext";
import { LinearGradient } from "expo-linear-gradient";

export default function Dashboard() {
  const { userData } = useUser();
  const theme = useColorScheme();
  const backgroundColor = Colors[theme].background;
  const backgroundGrey = Colors[theme].backgroundGrey;

  return (
    <ThemedView scrollable style={styles.dashboard}>
      <LinearGradient
        colors={[backgroundColor, backgroundGrey]}
        locations={[0, 0.8]}
        style={[styles.header, { borderColor: Colors[theme].border }]}
      >
        <SafeAreaView style={styles.container}>
          <ThemedText type="subtitle" style={styles.title}>
            {userData.posts.length} posts.
          </ThemedText>
        </SafeAreaView>
      </LinearGradient>
      <DashboardContent />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  dashboard: {
    borderRadius: 20,
    height: "100%",
  },
  header: {
    width: "100%",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderRadius: 16,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderWidth: 1,
    borderTopWidth: 0,
  },
  title: {
    fontSize: 28,
    marginTop: 20,
    marginBottom: 10,
  },
});
