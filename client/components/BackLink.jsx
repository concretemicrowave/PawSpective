import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedComponents";
import { useNavigation } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

export function BackLink({ white = true }) {
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ThemedView>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: white
                ? "rgba(0, 0, 0, 0.3)"
                : "rgba(255, 255, 255, 0.7)",
            },
          ]}
          onPress={handleBack}
        >
          <Feather
            name="arrow-left"
            size={24}
            color={white ? "#fff" : "#000"}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000000000,
  },
  button: {
    padding: 10,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 45,
  },
});
