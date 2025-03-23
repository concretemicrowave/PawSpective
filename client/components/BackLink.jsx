import { ThemedView, ThemedText } from "./ThemedComponents";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";

export function BackLink() {
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ThemedView style={{ paddingHorizontal: 30 }}>
      <SafeAreaView>
        <ThemedText type="link" onPress={handleBack}>
          Back
        </ThemedText>
      </SafeAreaView>
    </ThemedView>
  );
}
