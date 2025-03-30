import { useUser } from "../../context/UserContext";
import { View } from "react-native";
import { ThemedText, ThemedInput } from "../ThemedComponents";
import { StyleSheet } from "react-native";
// import Post from "./Post/Post";

export default function DashboardContent() {
  const { userData } = useUser();

  return (
    <View style={styles.container}>
      {/* {userData.posts.map((post, index) => (
        <Post key={index} post={post} />
      ))} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 100,
    paddingHorizontal: 10,
  },
});
