import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ThemedView, ThemedText } from "../../../components/ThemedComponents";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors } from "../../../constants/Colors";
import * as Updates from "expo-updates";
import { useUser } from "../../../context/UserContext";

export default function Account() {
  const { userData } = useUser();
  const navigation = useNavigation();
  const { logout, deleteAccount, verifyEmail, changeName, changePassword } =
    useAuth();

  const handleLogout = () => {
    logout();
    navigation.navigate("openScreen/index");
  };

  const handleDelete = () => {
    Alert.alert(
      "Are you sure?",
      "This will permanently delete your account and all associated data.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteAccount();
              Alert.alert("Deleted", "Your account has been deleted.");
              Updates.reloadAsync();
            } catch (e) {
              Alert.alert("Error", e.message);
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  const handleVerify = async () => {
    try {
      await verifyEmail();
      Alert.alert("Sent", "Verification email has been sent.");
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  const handleChangeName = () => {
    Alert.prompt("Change Name", "Enter new name:", async (newName) => {
      if (!newName) return;
      try {
        await changeName(newName);
        Alert.alert("Success", "Name updated.");
      } catch (e) {
        Alert.alert("Error", e.message);
      }
    });
  };

  const handleChangePassword = () => {
    Alert.prompt(
      "Current Password",
      "Enter your current password:",
      (currentPassword) => {
        if (!currentPassword) return;

        Alert.prompt(
          "New Password",
          "Enter your new password:",
          async (newPassword) => {
            if (!newPassword) return;
            try {
              await changePassword(currentPassword, newPassword);
              Alert.alert("Success", "Password updated.");
            } catch (e) {
              Alert.alert("Error", e.message);
            }
          },
        );
      },
    );
  };

  const backgroundColor = Colors["light"].background;
  const backgroundGrey = Colors["light"].grey;

  return (
    <ThemedView scrollable secondary style={styles.container}>
      <View style={styles.header}>
        <LinearGradient
          colors={[backgroundColor, backgroundGrey]}
          locations={[0.999, 0]}
          style={StyleSheet.absoluteFill}
        />
        <SafeAreaView style={styles.titleContainer}>
          <MaterialCommunityIcons name="account" size={36} color="black" />
          <ThemedText type="subtitle" style={styles.title}>
            Welcome, {userData.name}
          </ThemedText>
        </SafeAreaView>
      </View>
      <View style={styles.content}>
        <ThemedText style={styles.sectionLabel}>PROFILE</ThemedText>
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.option} onPress={handleChangeName}>
            <ThemedText style={styles.optionText}>Change Name</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={handleChangePassword}
          >
            <ThemedText style={styles.optionText}>Change Password</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, { borderBottomWidth: 0 }]}
            onPress={handleVerify}
          >
            <ThemedText style={styles.optionText}>Verify Email</ThemedText>
          </TouchableOpacity>
        </View>
        <ThemedText style={styles.sectionLabel}>DANGEROUS</ThemedText>
        <View style={[styles.optionsContainer, styles.danger]}>
          <TouchableOpacity
            style={[styles.option, { borderColor: "#e06d6d" }]}
            onPress={handleLogout}
          >
            <ThemedText style={styles.optionText} color="attention">
              Logout
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, { borderBottomWidth: 0 }]}
            onPress={handleDelete}
          >
            <ThemedText style={styles.optionText} color="attention">
              Delete Account
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    height: 200,
    padding: 20,
    position: "relative",
    overflow: "hidden",
  },
  titleContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    transform: [{ translateY: 36 }],
  },
  title: {
    fontSize: 28,
  },
  content: {
    padding: 20,
    transform: [{ translateY: -108 }],
    flexDirection: "column",
  },
  optionsContainer: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    overflow: "hidden",
    marginBottom: 12,
  },
  option: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  optionText: {
    fontSize: 16,
  },
  danger: {
    backgroundColor: "#ffebeb",
    borderWidth: 1,
    borderColor: "#d32f2f",
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "bold",
    opacity: 0.8,
    marginBottom: 4,
    marginTop: 8,
    marginLeft: 4,
    letterSpacing: 0.5,
  },
});
