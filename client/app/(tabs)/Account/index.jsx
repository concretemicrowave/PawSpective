import { StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Updates from "expo-updates";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useAuth } from "../../../hooks/useAuth";
import { useUser } from "../../../context/UserContext";
import Section from "../../../components/AccountContent/Section";
import { ThemedView, ThemedText } from "../../../components/ThemedComponents";

export default function Account() {
  const navigation = useNavigation();
  const { userData } = useUser();
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

  return (
    <ThemedView scrollable secondary style={styles.container}>
      <SafeAreaView style={styles.titleContainer}>
        <MaterialCommunityIcons name="account" size={36} color="black" />
        <ThemedText type="subtitle" style={styles.title}>
          Welcome, {userData.name}
        </ThemedText>
      </SafeAreaView>
      <ThemedView style={styles.content}>
        <Section
          title="PROFILE"
          items={[
            { label: "Change Name", onPress: handleChangeName },
            { label: "Change Password", onPress: handleChangePassword },
            { label: "Verify Email", onPress: handleVerify },
          ]}
        />
        <Section
          title="DANGEROUS"
          variant="danger"
          items={[
            { label: "Logout", onPress: handleLogout, attention: true },
            { label: "Delete Account", onPress: handleDelete, attention: true },
          ]}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 8,
    marginBottom: -39,
  },
  title: {
    fontSize: 28,
  },
  content: {
    padding: 20,
    flexDirection: "column",
  },
});
