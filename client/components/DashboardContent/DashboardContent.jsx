import { useUser } from "../../context/UserContext";
import { View } from "react-native";
import { ThemedText, ThemedInput } from "../ThemedComponents";
import { StyleSheet } from "react-native";
import Post from "./post";

export default function DashboardContent() {
  const { userData } = useUser();

  return (
    <View style={styles.container}>
      <ThemedInput height="40" style={{ width: "100%" }} placeholder="Search" />
      {userData.posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 100,
  },
});
