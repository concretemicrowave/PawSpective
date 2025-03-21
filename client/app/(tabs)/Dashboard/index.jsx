import { StyleSheet, SafeAreaView, View } from "react-native";
import { Icon } from "@/components/Icon";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { Colors } from "../../../constants/Colors";
import { useColorScheme } from "react-native";
import {
  ThemedView,
  ThemedText,
  ThemedButton,
} from "../../../components/ThemedComponents";

export default function Dashboard() {
  const theme = useColorScheme();
  const backgroundColor = Colors[theme].background;

  return (
    <ThemedView scrollable secondary style={styles.dashboard}>
      <View style={[styles.header, { backgroundColor }]}>
        <SafeAreaView style={styles.container}>
          <ThemedText type="subtitle" style={styles.title}>
            Dashboard
          </ThemedText>
          <ThemedButton style={styles.button} title="Create New" />
        </SafeAreaView>
      </View>
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
