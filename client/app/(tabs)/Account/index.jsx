import { StyleSheet, SafeAreaView, View } from "react-native";
import { Colors } from "../../../constants/Colors";
import { useColorScheme } from "react-native";
import {
  ThemedView,
  ThemedText,
  ThemedButton,
} from "../../../components/ThemedComponents";
import { useAuth } from "../../../hooks/useAuth";

export default function Dashboard() {
  const { logout } = useAuth();
  const theme = useColorScheme();
  const backgroundColor = Colors[theme].background;

  return (
    <ThemedView scrollable secondary style={styles.dashboard}>
      <View style={[styles.header, { backgroundColor }]}>
        <SafeAreaView style={styles.container}>
          <ThemedText type="subtitle" style={styles.title}>
            Account
          </ThemedText>
          <ThemedButton title="Edit" />
        </SafeAreaView>
      </View>
      <View style={styles.content}>
        <ThemedButton
          hollow
          color="attention"
          title="Logout"
          onPress={logout}
        />
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
  content: {
    padding: 20,
    flexDirection: "column",
  },
});
