import { StyleSheet, SafeAreaView, View } from "react-native";
import { useNavigation } from "expo-router";
import { Colors } from "../../../constants/Colors";
import { useColorScheme } from "react-native";
import {
  ThemedView,
  ThemedText,
  ThemedButton,
} from "../../../components/ThemedComponents";
import DashboardContent from "../../../components/DashboardContent/DashboardContent";
import { useUser } from "../../../context/UserContext";

export default function Dashboard() {
  const { userData } = useUser();
  const navigation = useNavigation();
  const theme = useColorScheme();
  const backgroundColor = Colors[theme].background;

  return (
    <ThemedView scrollable secondary style={styles.dashboard}>
      <View style={[styles.header, { backgroundColor }]}>
        <SafeAreaView style={styles.container}>
          <ThemedText type="subtitle" style={styles.title}>
            Hello, {userData.name}!
          </ThemedText>
          <ThemedButton
            onPress={() => navigation.navigate("index")}
            style={styles.button}
            title="Create New"
          />
        </SafeAreaView>
      </View>
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
  },
  title: {
    fontSize: 28,
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    width: "100%",
  },
});
