import { StyleSheet } from "react-native";
import { View } from "react-native";
import { ThemedText } from "./ThemedComponents";
import { useThemeColor } from "../hooks/useThemeColor";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faFire,
  faDrumstickBite,
  faBreadSlice,
} from "@fortawesome/free-solid-svg-icons";

export function Nutriments({ lightColor, darkColor, nutriments }) {
  const borderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "border",
  );

  return (
    <View
      style={[
        styles.container,
        { borderColor, backgroundColor: "rgba(255, 255, 255, 0.1)" },
      ]}
    >
      <View style={styles.nutriment}>
        <FontAwesomeIcon icon={faFire} size={24} color="#FF3C00" />
        <ThemedText>
          <ThemedText type="subtitle" style={styles.boldText}>
            {nutriments.calories}
          </ThemedText>{" "}
          calories
        </ThemedText>
      </View>
      <View style={styles.nutriment}>
        <FontAwesomeIcon icon={faDrumstickBite} size={24} color="#C47222" />
        <ThemedText>
          <ThemedText type="subtitle" style={styles.boldText}>
            {nutriments.protein}
          </ThemedText>{" "}
          protein
        </ThemedText>
      </View>
      <View style={styles.nutriment}>
        <FontAwesomeIcon icon={faBreadSlice} size={24} color="#FAE5D3" />
        <ThemedText>
          <ThemedText type="subtitle" style={styles.boldText}>
            {nutriments.carbs}
          </ThemedText>{" "}
          carbs
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  nutriment: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 6,
  },
  boldText: {
    fontSize: 16,
  },
});
