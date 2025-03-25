import { ThemedView, ThemedText } from "./ThemedComponents";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { useNavigation } from "expo-router";

export function BackLink() {
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ThemedView>
      <SafeAreaView style={styles.container}>
        <ThemedText type="link" onPress={handleBack}>
          ← Back
        </ThemedText>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});
