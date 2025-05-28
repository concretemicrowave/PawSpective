import { View, StyleSheet } from "react-native";
import { BackLink } from "../../components/BackLink";
import Title from "../../components/Title";
import LiveFeed from "../../components/LiveFeed";

export default function LiveFeedScreen() {
  return (
    <>
      <BackLink white={false} />
      <View style={styles.container}>
        <Title text="Live Feed" />
        <LiveFeed />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
