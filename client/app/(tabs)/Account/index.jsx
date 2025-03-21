import { StyleSheet, SafeAreaView, View } from "react-native";
import { Icon } from "@/components/Icon";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Colors } from "../../../constants/Colors";
import { useColorScheme } from "react-native";
import { ThemedView, ThemedText } from "../../../components/ThemedComponents";

export default function Dashboard() {
  const theme = useColorScheme();
  const borderColor = Colors[theme].border;

  return (
    <ThemedView scrollable secondary style={styles.dashboard}>
      <SafeAreaView style={styles.container}>
        <View style={[styles.header, { borderBottomColor: borderColor }]}>
          <Icon icon={faUser} size={20} />
          <ThemedText type="subtitle" style={styles.title}>
            Account
          </ThemedText>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dashboard: {
    paddingHorizontal: 24,
    borderRadius: 20,
    height: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 28,
  },
});
