import { StyleSheet, View, Image } from "react-native";
import { ThemedText, ThemedButton } from "../ThemedComponents";

export default function DrawerContent({ image }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: image.uri }} style={styles.logo} />
        <View>
          <ThemedText type="subtitle">*Insert food</ThemedText>
          <ThemedText style={{ opacity: 0.8 }}>Expires something</ThemedText>
        </View>
      </View>
      <ThemedButton
        hollow
        borderRadius={50}
        title="Save"
        onPress={() => console.log("Saved")}
        style={{ marginTop: "auto", marginBottom: 80 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  logo: {
    width: "50%",
    aspectRatio: 1,
    marginBottom: 10,
    borderRadius: 12,
  },
});
