import { StyleSheet, SafeAreaView, View } from "react-native";
import { Colors } from "../../../constants/Colors";
import {
  ThemedView,
  ThemedText,
  ThemedButton,
} from "../../../components/ThemedComponents";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

export default function Dashboard() {
  const navigation = useNavigation();
  const { logout } = useAuth();
  const backgroundColor = Colors["light"].background;

  const handleLogout = () => {
    logout();
    navigation.navigate("openScreen/index");
  };

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
          borderRadius={50}
          color="attention"
          title="Logout"
          onPress={handleLogout}
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
