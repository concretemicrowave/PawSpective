import { useUser } from "../../context/UserContext";
import { View } from "react-native";
import { ThemedText } from "../ThemedComponents";

export default function DashboardContent() {
  const { userData } = useUser();

  return (
    <View>
      <ThemedText>Welcome, {userData.name}!</ThemedText>
      <ThemedText>Your email is {userData.email}.</ThemedText>
    </View>
  );
}
